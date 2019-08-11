const db = require("../db/db");

let Pool = {};

Pool.all = opts => {
  let { page = 1, pageSize = 10 } = opts;
  [ page, pageSize ] = [ parseInt(page), parseInt(pageSize) ]; 

  // Quick and dirty at this stage. Just filter on whole result set.

  return new Promise((resolve, reject) => {
    db.all(`SELECT
              pool.id, pool.title, pool.url, pool.description, pool.goal, pool.address_btc, count(*)-1 AS contribution_count
            FROM
              pool 
            LEFT OUTER JOIN
              contribution ON (pool.id = contribution.pool_id)
            WHERE
              pool.status <> 'unconfirmed'
            GROUP BY pool.id, pool.title, pool.url, pool.description, pool.goal, pool.address_btc`, function(err, rows) {
      if (err)
        reject(err);
      
      const resultCount = rows.length;
      const totalPages = Math.ceil(resultCount / pageSize);
      const startIdx = ( page - 1 ) * ( pageSize );
      const endidx = (((startIdx + pageSize) > resultCount) ? resultCount : startIdx + pageSize);
      const data = rows.slice(startIdx, endidx);

      resolve({ data, pageSize, totalPages, resultCount });
    });
  })
};

Pool.add = opts => {
  const values = Object.values(opts);
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO pool(title, url, description, goal, status) VALUES (?, ?, ?, ?, 'unconfirmed')", values, function(err) {
      if (err)
        reject(err);
      resolve(this.lastID);
    });
  })
};

Pool.getContributions = opts => {
  return new Promise((resolve, reject) => {
    const values = Object.values(opts);
    db.all("SELECT contribution.meta, contribution.status FROM pool INNER JOIN contribution ON (pool.id = contribution.pool_id) WHERE pool.id = ?", values, function(err, rows) {
      if (err)
        reject(err);
      resolve(rows);
    });
  })
};

module.exports = Pool;
