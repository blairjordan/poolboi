const Client = require("coinbase").Client;
const { apiKey, apiSecret } = require("../config.json").coinbase;

const client = new Client({ apiKey, apiSecret });

/*

// Verify and create a new address
// TODO: Store the address against the DB record

client.getAccount('MY_COINBASE_ACCOUNT_ID', function(err, account) {
  account.createAddress(null, function(err, address) {
    console.log(address);
  });
});

*/
