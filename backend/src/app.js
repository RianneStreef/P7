const express = require("express");
const app = express();

const mysql = require("mysql");
const chalk = require("chalk");
const axios = require("axios").default;
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const path = require("path");

const articleRoutes = require("./routes/article");
const userRoutes = require("./routes/user");

const { connection } = require("./db");

require("dotenv").config();

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(cors({ origin: true, credentials: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());
// app.use(bodyParser.json());

app.use("/articles", articleRoutes);
app.use("/users", userRoutes);

module.exports = app;