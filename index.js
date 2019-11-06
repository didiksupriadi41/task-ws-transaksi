/* eslint-disable no-undef */
const express = require("express");
const mysql = require('mysql');
const moment = require('moment');
const bodyParser = require('body-parser');
const app = express();
const defaultStatus = "pending";


function addTransaction(idUser, virtualAccount, idMovie, idSchedule, seat, response) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'ws-transaksi'
    });

    var now = moment().format("YYYY-MM-DD HH:mm:ss");
    var idTransaksi = 0;

    connection.connect();

    var query = `INSERT INTO TransaksiTiket \
            (idUser, virtualAccount, idMovie, idSchedule, seat, creationTime, status) \
            VALUE (${idUser},${virtualAccount},${idMovie},${idSchedule},${seat},'${now}','${defaultStatus}')`;

    connection.query(query, function (err, result) {
        if (err) response.sendStatus(400).send("Wrong Query!");
        idTransaksi = result.insertId;

        response.send({ idTransaksi: idTransaksi });
    });

    connection.end();
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.post('/transaksi', function (request, response) {
    let idUser = request.body.idUser;
    let virtualAccount = request.body.virtualAccount;
    let idMovie = request.body.idMovie;
    let idSchedule = request.body.idSchedule;
    let seat = request.body.seat;
    addTransaction(idUser, virtualAccount, idMovie, idSchedule, seat, response);
});

app.listen(3000, function () {
    console.log("Server running on port 3000...");
});