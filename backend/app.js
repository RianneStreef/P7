const express = require("express");
const app = express();

const mysql = require("mysql");
const chalk = require("chalk");
const axios = require("axios").default;
const cors = require("cors");

const path = require("path");

const articleRoutes = require("./routes/article");
const userRoutes = require("./routes/user");

require("dotenv").config();

const con = mysql.createConnection({
  host: "remotemysql.com",
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: "OXgD76ZhvJ",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// node

// con.query(
//   "create table Users (id int auto_increment primary key, firstName varchar(255) null, lastName varchar(255) null, email varchar(255) null, password varchar(255) null);",
//   function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   }
// );

// con.query("DROP TABLE Employees", function (err, result) {
//   if (err) throw err;
//   console.log("Info deleted");
// });

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

// app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/articles", articleRoutes);
app.use("/api/auth", userRoutes);

app.get("/api/articles", (req, res, next) => {
  con.query(
    "SELECT * FROM articles ORDER BY id DESC LIMIT 10",
    function (err, result) {
      if (err) {
        return res.status(400).json({
          message: "Unable to fetch articles",
        });
      }
      return res.status(200).json({
        articles: result,
      });
    }
  );
});

// can we let users choose the max of how many articles the want to see?

// app.delete("/api/articles", (req, res, next) => {
//   con.query("DELETE FROM articles WHERE id=2", function (err, result) {
//     if (err) {
//       return res.status(400).json({
//         message: "Couldn't delete article!",
//       });
//     }
//     return res.status(200).json({
//       message: "Deleted!",
//     });
//   });
// });

// need to get the id nr of the article when it is generated, so I can use it for delete, and maybe like

// axios.get('/api/articles')
// .then(function (response) {
//   return res.status(200).json({
//     articles: result,
//   })
// })
// .catch(function (error) {
//   return res.status(400).json({
//     message: 'Unable to fetch articles',
//   })
// })

module.exports = app;
