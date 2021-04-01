const express = require("express");
const app = express();

const mysql = require("mysql");
const chalk = require("chalk");
const axios = require("axios").default;
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const { connection } = require("../db");

exports.getAll = (req, res, next) => {
  // connection.connect(() => {
  //   console.log("connecting");
  connection.query(
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

  //   connection.end(function (err) {
  //     if (err) {
  //       return console.log("error:" + err.message);
  //     }
  //     console.log("Close the database connection.");
  //   });
  // });
};

exports.getOne = (req, res, next) => {
  // connection.connect(() => {
  // console.log("connecting");

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

  // connection.end(function (err) {
  //   if (err) {
  //     return console.log("error:" + err.message);
  //   }
  //   console.log("Close the database connection.");
  // });
  // });
};

exports.update = (req, res, next) => {
  // connection.connect(() => {
  //console.log("connecting");

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

  // connection.end(function (err) {
  //   if (err) {
  //     return console.log("error:" + err.message);
  //   }
  //   console.log("Close the database connection.");
  // });
  // });
};

exports.addArticle = (req, res, next) => {
  // connection.connect(() => {
  // console.log("connecting");

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

  // connection.end(function (err) {
  //   if (err) {
  //     return console.log("error:" + err.message);
  //   }
  //   console.log("Close the database connection.");
  // });
  // });
};
