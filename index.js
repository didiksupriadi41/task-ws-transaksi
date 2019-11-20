/* eslint-disable no-undef */
const express = require("express");
const bodyParser = require('body-parser');
const addTransaction = require('./addTransaction.js');
const editTransaction = require('./editTransaction.js');
const getSeats = require('./getSeats.js')
const app = express();
const { port } = require("./config");


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/add', function (request, response) {
    let idUser = request.body.idUser;
    let virtualAccount = request.body.virtualAccount;
    let idMovie = request.body.idMovie;
    let idSchedule = request.body.idSchedule;
    let seat = request.body.seat;
    addTransaction(idUser, virtualAccount, idMovie, idSchedule, seat, response);
});

app.post('/edit', function (request, response) {
    let idTransaksi = request.body.idTransaksi;
    editTransaction(idTransaksi, response);
});

app.get('/seat', function (request, response) {
    let idSchedule = request.query.idSchedule;
    getSeats(idSchedule, response);
});

app.listen(port, function () {
    console.log(`Server running on port ${port}...`);
});