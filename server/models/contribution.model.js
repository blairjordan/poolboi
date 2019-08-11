const validator = require('validator');
const db = require("../db/db");

let Contribution = {};

Contribution.all = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM contribution", function(err, rows) {
      if (err)
        reject(err);

      resolve(rows);
    });
  })
};

Contribution.add = opts => {
  const values = Object.values(opts);
  const meta = JSON.parse(values[2]);
  return new Promise((resolve, reject) => {
    if (!validator.isEmail(meta.email)) {
      reject("Unable to validate email address");
      return;
    }
    db.run("INSERT INTO contribution(pool_id, txid, meta) VALUES (?, ?, ?)", values, function(err) {
      if (err)
        reject(err);
      resolve(this.lastID);
    });
  })
};

module.exports = Contribution;
