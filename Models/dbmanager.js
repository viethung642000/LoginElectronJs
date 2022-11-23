const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database("../DatabaseSQLite.db", sqlite.OPEN_READWRITE, (err) => {
    if(err) return console.log(err.message);

    console.log("Connection Successfully");
});
exports.db = db;