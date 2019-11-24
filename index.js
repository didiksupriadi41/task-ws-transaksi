/* eslint-disable no-undef */
const express = require("express");
const bodyParser = require('body-parser');
const addTransaction = require('./addTransaction.js');
const editTransaction = require('./editTransaction.js');
const getTransaction = require('./getTransaction.js');
const getSeats = require('./getSeats.js');
const editIsRated = require('./editIsRated.js');
const app = express();
const { port } = require("./config");
const cors = require("cors");

app.use(cors());
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
    let waktuDariEngima = request.body.waktuBayar;
    editTransaction(idTransaksi, waktuDariEngima, response);
});

app.post('/rate', function (request, response) {
    let idTransaksi = request.body.idTransaksi;
    let val = request.body.val;
    editIsRated(idTransaksi, val, response);
})

app.get('/get', function (request, response) {
    let idUser = request.query.idUser;
    getTransaction(idUser, response);
});

app.get('/seat', function (request, response) {
    let idSchedule = request.query.idSchedule;
    getSeats(idSchedule, response);
});

app.listen(port, function () {
    console.log(`Server running on port ${port}...`);
});
