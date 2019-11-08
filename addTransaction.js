const moment = require('moment');
const database = require('./database.js');
const defaultStatus = "pending";

module.exports = function addTransaction(idUser, virtualAccount, idMovie, idSchedule, seat, response) {
    if (idUser && virtualAccount && idMovie && idSchedule && seat && response) {

        var now = moment().format("YYYY-MM-DD HH:mm:ss");

        var query = `INSERT INTO transaksi \
            (idUser, virtualAccount, idMovie, idSchedule, seat, creationTime, status) \
            VALUES (?,?,?,?,?,?,?)`;

        let db = database.connect();

        db.run(query, [idUser, virtualAccount, idMovie, idSchedule, seat, now, defaultStatus],
            function (err) {
                if (err) {
                    response.status(400).send("Wrong Query!");
                    console.error(err.message);
                }
                console.log(this.lastID);
                response.send({ idTransaksi: this.lastID });
            });

        database.end(db);
    } else {
        response.status(400).send("Wrong Query!");
    }
}