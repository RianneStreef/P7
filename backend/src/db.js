const mysql = require("mysql");

require("dotenv").config();

const connection = mysql.createConnection({
  host: "remotemysql.com",
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: "OXgD76ZhvJ",
});

module.exports = { connection };
