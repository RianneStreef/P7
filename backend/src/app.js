const express = require("express");
const app = express();

const cors = require("cors");

const articleRoutes = require("./routes/article");
const userRoutes = require("./routes/user");

require("dotenv").config();

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
