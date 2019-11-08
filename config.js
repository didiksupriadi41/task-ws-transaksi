const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    user: process.env.MYSQL_SERVER_USER,
    password: process.env.MYSQL_SERVER_PASSWORD,
    port: process.env.PORT,
};