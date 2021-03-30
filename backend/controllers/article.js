const express = require("express");
const app = express();

const mysql = require("mysql");
const chalk = require("chalk");
const axios = require("axios").default;
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const connection = mysql.createConnection({
  host: "remotemysql.com",
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: "OXgD76ZhvJ",
});

exports.getAll = (req, res, next) => {
  // connection.connect() {
  //   if (error) {
  //     throw error;
  //   }
  connection.query(
    "SELECT * FROM articles ORDER BY id DESC LIMIT 10",
    function (error, result) {
      if (error) {
        return res.status(400).json({
          message: "Unable to fetch articles",
        });
      }
      return res.status(200).json({
        articles: result,
      });
    }
  );
  // connection.end((error) => {
  //   console.log("Closed connection");
  //   if (error) {
  //     throw error;
  //   }
  // });
  // });
};

exports.getOne = (req, res, next) => {
  console.log("searching for article");
  const id = req.params.id;
  console.log(chalk.magenta(id));
  connection.query(
    `SELECT usersLiked, usersDisliked FROM articles WHERE  id = ${id};`,
    function (err, result) {
      if (err) {
        return res.status(400).json({
          message: "Unable to fetch articles",
        });
      }
      return res.status(200).json({
        articleUpdate: result,
      });
    }
  );
};

exports.update = (req, res, next) => {
  console.log("updating article");
  const { id } = req.body;
  let { usersLiked, usersDisliked } = req.body;
  usersLiked = JSON.stringify(usersLiked);
  usersDisliked = JSON.stringify(usersDisliked);
  console.log(id, usersLiked, usersDisliked);
  console.log(typeof usersLiked);
  connection.query(
    `UPDATE articles SET usersLiked = '${usersLiked}', usersDisliked = '${usersDisliked}' WHERE id = ${id}`,
    function (err, result) {
      if (err) {
        return res.status(400).json({
          message: "Unable to update article",
        });
      }
      return res.status(200).json({
        message: "Article updated",
      });
    }
  );
};

exports.likeArticles = (req, res, next) => {
  console.log("start");
  const { title, description, url } = req.body;
  let { usersLiked, usersDisliked } = req.body;
  console.log(title, description, url);
  usersLiked = JSON.stringify(usersLiked);
  usersDisliked = JSON.stringify(usersDisliked);
  console.log(usersLiked, usersDisliked);
  console.log(chalk.magenta(typeof usersLiked));

  connection.query(
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
};
