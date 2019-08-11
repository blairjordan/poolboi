var sqlite3 = require('sqlite3').verbose();
var file = "../db/poolboi.db";
var db = new sqlite3.Database(file);
const Client = require("coinbase").Client;
const { apiKey, apiSecret } = require("../config.json").coinbase;

const COINBASE_ACCOUNT_ID = "MY_COINBASE_ACCOUNT_ID";

const client = new Client({ apiKey, apiSecret });

const getUnconfirmedContributions = () => {
  return new Promise((resolve, reject) => {
    db.all(`
    SELECT pool.id, pool.address_btc, contribution.id AS contribution_id, txid, contribution.status
    FROM
        contribution 
      INNER JOIN pool ON (contribution.pool_id = pool.id) 
    WHERE contribution.status IS NULL
      OR contribution.status <> 'confirmed'`, function(err, rows) {
      if (err)
        reject(err);

      resolve(rows);
    });
  });
};

const updateContributionStatus = (contributionId, status) => {
  const data = [status, contributionId];
  return new Promise((resolve, reject) => {
    db.run(`UPDATE contribution SET status = ? WHERE id = ?`, data, function(err, rows) {
      if (err)
        reject(err);

      resolve(rows);
    });
  });
};

const getTransactions = (address, cb) => {
  return new Promise((resolve, reject) => {
    client.getAccount(COINBASE_ACCOUNT_ID, function(err, account) {
      if (err) { reject(err); return; }
      account.getAddress(address, function(err, address) {
        if (err) { reject(err); return; }
        address.getTransactions({pagination: { limit: 100 }}, function(err, txs) {
          if (err) { reject(err); return; }
          resolve(txs);
        });
      });
    });
  });
};

(async () => {
  try {
    const unconfirmed = await getUnconfirmedContributions();

    unconfirmed.forEach(async (u) => {
      try {
        const txs = await getTransactions(u.address_btc);
        const tx = txs.map(t => { return { hash: t.network.hash, status: t.network.status, amount: t.amount }; });
        tx.filter(t => t.hash === u.txid).forEach(m => {
          updateContributionStatus(u.contribution_id, m.status);
        });
      } catch (err) {
        console.log(err);
      }
    });

    /*
    const txs = await getTransactions("MY_COINBASE_ACCOUNT_ID");
    console.log(unconfirmed);
    
    txs.forEach(t => {
      console.log(t.network.hash, t.network.status, t.amount);
    });
    */
  } catch (err) {
    console.log(err);
  }
})();