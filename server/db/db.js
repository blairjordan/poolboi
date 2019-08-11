var sqlite3 = require('sqlite3').verbose();
var file = "./db/poolboi.db";
var db = new sqlite3.Database(file);

module.exports = db;
