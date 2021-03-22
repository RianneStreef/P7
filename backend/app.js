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

// app.use("/api/articles", articleRoutes);
// app.use('/api/auth', userRoutes);

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

// app.get("api/articles", (req, res, next) => {
//   con.query(
//     `SELECT usersLiked, usersDisliked FROM articles WHERE  id = ${id};`,
//     function (err, result) {
//       if (err) {
//         return res.status(400).json({
//           message: "Unable to fetch articles",
//         });
//       }
//       return res.status(200).json({
//         articles: result,
//       });
//     }
//   );
// });

app.post("/api/auth/signup", (req, res, next) => {
  console.log("signing up");
  const { email, password, firstName, lastName, articlesRead } = req.body;
  console.log(email, password, firstName, lastName, articlesRead);
  con.query(
    `INSERT INTO Users (firstName, lastName, email, password, articlesRead) VALUES ('${firstName}', '${lastName}', '${email}', '${password}' ,'${articlesRead}');`,
    function (err, result) {
      console.log(chalk.magenta(result));
      console.log(result.insertId);
      if (err) {
        console.log(err);
        if (err.errno && err.errno === 1062) {
          return res.status(400).json({
            message: "Error. Duplicate email field",
            field: "email",
          });
        }
        // THIS IS FOR DEMO, TAKE OUT OR REWORK
        // The field shows which control on frontend had an error
        if (err.errno && err.errno === 9999999) {
          return res.status(400).json({
            message: "Error. Username invalid syntax",
            field: "username",
          });
        }
        return res.status(500).json({
          message: "Unknown error",
        });
      }

      return res.status(200).json({
        user: { email, firstName, lastName, articlesRead, id: result.insertId },
      });
    }
  );
});

app.delete("/api/auth/", (req, res, next) => {
  console.log("finding and deleting profile");
  const id = req.params.id;

  con.query(`DELETE FROM Users WHERE id='${id}';`, function (err, result) {
    if (err) {
      return res.status(400).json({
        message: "Unable to delete profile",
      });
    }
    return res.status(200).json({
      message: "Profile deleted",
    });
  });
});

app.put("/api/auth/", (req, res, next) => {
  console.log("changing profile");
  const { id, email, firstName, lastName, articlesRead } = req.body;
  console.log(id, email, firstName, lastName, articlesRead);
  con.query(
    `UPDATE Users SET firstName = '${firstName}', lastName = '${lastName}', articlesRead = '${articlesRead}' WHERE id = ${id}`
  );
});

app.put("/api/articles/", (req, res, next) => {
  console.log("liking");
  const { id, usersLiked, usersDisliked } = req.body;
  console.log(id, usersLiked, usersDisliked);
  con.query(
    `UPDATE articles SET usersLiked = '${usersLiked}', usersDisliked = '${usersDisliked}' WHERE id = ${id}`
  );
});

// app.get("/api/auth/", (req, res, next) => {
//   console.log(chalk.magenta("looking for user"));
//   // console.log(req.body);
//   // const { currentUser } = req.body;
//   const currentUser = "riannestreef@gmail.com";
//   console.log(currentUser);
//   // define email to find
//   con.query(
//     // 'GET * FROM Users'

//     `SELECT * FROM Users WHERE email='${currentUser}';`,
//     // make email dynamic

//     // like signup call
//     function (err, result) {
//       if (err) {
//         console.log(err);
//       }
//       return res.status(200).json({
//         // return all info on entry with defined email ??
//         user: "result",
//       });
//     }
//   );
// });

app.post("/api/articles", (req, res, next) => {
  console.log("start");
  const { title, description, url } = req.body;
  console.log(title, description, url);
  con.query(
    `INSERT INTO articles (title, description, url) VALUES ('${title}', '${description}', '${url}');`,
    function (err, result) {
      if (err) {
        console.log(err);
        if (err.errno && err.errno === 1062) {
          return res.status(400).json({
            message: "Error. Duplicate email field",
          });
        }
        return res.status(500).json({
          message: "Unknown error",
        });
      }

      return res.status(200).json({
        message: "success",
      });
    }
  );
});

module.exports = app;
