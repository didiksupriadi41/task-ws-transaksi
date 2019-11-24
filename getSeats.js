const mysql = require('mysql');
const { user, password, cancelledStatus } = require("./config");

module.exports = function getSeats(idSchedule, response) {
    if (idSchedule && response) {

        var connection = mysql.createConnection({
            host: 'localhost',
            user: user,
            password: password,
            database: 'ws-transaksi'
        });

        connection.connect();

        var query = `SELECT seat FROM TransaksiTiket WHERE idSchedule=? AND status<>?`;

        connection.query(query, [idSchedule, cancelledStatus],
            function (err, result) {
                if (err) {
                    response.status(400).send("Wrong Query!");
                    console.log(err);
                }
                var seats = [];
                result.forEach(tuple => {
                    seats.push(tuple.seat);
                });
                response.send({ idSchedule: idSchedule, seats: seats });
            });

        connection.end();
    } else {
        response.status(400).send("Wrong Query!");
    }
}

