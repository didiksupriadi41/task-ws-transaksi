const sqlite3 = require('sqlite3').verbose();
// var db;

function connect() {
    // open the database
    return new sqlite3.Database('./db/ws-transaksi.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the ws-transaksi database.');
    });
}

function end(database) {
    // close
    database.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

module.exports = { connect, end };