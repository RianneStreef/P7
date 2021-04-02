const express = require("express");
const app = express();

const mysql = require("mysql");
const chalk = require("chalk");
const axios = require("axios").default;
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const { connection } = require("../db");
const { yellowBright } = require("chalk");

exports.login = async (req, res, next) => {
  // connection.connect(() => {
  //   console.log("connecting");
  console.log("logging in ");
  const { email, password } = req.body;

  if (!req?.body?.password || !req?.body?.email) {
    return res.status(400).json({
      message: "Incorrect input",
    });
  }
  connection.query(
    `SELECT password, id, firstName, lastName, articlesRead FROM Users WHERE email='${email}';`,
    async function (err, result) {
      if (err) {
        console.log(chalk.magenta(err));
        console.log(chalk.magenta("unable to login"));

        return res.status(400).json({
          message: "Unable to login",
        });
      }
      const id = result[0].id;
      const hash = result[0].password;
      const data = password;
      const comparedPassword = await bcrypt.compare(data, hash);
      if (comparedPassword === true) {
        const token = jwt.sign({ userId: id }, "ksjghdfliSGvligSBDLVb", {
          expiresIn: "24h",
        });
        return res.status(200).json({
          userId: id,
          token: token,
          user: result,
          message: "Logged in",
        });
      }
      if (comparedPassword === false) {
        return res.status(400).json({
          message: "Incorrect password",
        });
      } else {
        return res.status(400).json({
          message: "Could not log in",
        });
      }
    }
  );
  // });
  // connection.end(function (err) {
  //   if (err) {
  //     return console.log("error:" + err.message);
  //   }
  //   console.log("Close the database connection.");
  // });
};

exports.signup = async (req, res, next) => {
  console.log("signing up");
  const { email, password, firstName, lastName } = req.body;
  let { articlesRead } = req.body;
  articlesRead = JSON.stringify(articlesRead);
  console.log(email, password, firstName, lastName, articlesRead);
  if (
    !req?.body?.password ||
    !req?.body?.email ||
    !req?.body?.firstName ||
    !req?.body?.lastName
  ) {
    return res.status(400).json({
      message: "Uncomplete input",
    });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  console.log(hashedPassword);
  let insertId = "";
  try {
    connection.query(
      `INSERT INTO Users (firstName, lastName, email, password, articlesRead)
        VALUES ('${firstName}', '${lastName}', '${email}', '${hashedPassword}' ,'${articlesRead}');`,
      function (err, result) {
        if (err) {
          console.log(chalk.magenta(err));
          console.log(chalk.greenBright(err.errno));
          if (err.errno && err.errno === 1062) {
            return res.status(400).json({
              message: "Error. Duplicate email field",
              field: "email",
            });
          }
          return res.status(400).json({
            message: "Unknown Error",
          });
        }
        insertId = result.insertId;
        const token = jwt.sign({ userId: insertId }, "ksjghdfliSGvligSBDLVb", {
          expiresIn: "24h",
        });
        return res.status(200).json({
          user: {
            email,
            firstName,
            lastName,
            articlesRead,
            id: insertId,
            token: token,
            userId: insertId,
          },
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.deleteProfile = (req, res, next) => {
  // connection.connect(() => {
  console.log(req.params.id);
  const id = req.params.id;
  console.log(chalk.yellowBright(req.body.id));
  console.log(chalk.yellowBright(req.body.token));
  connection.query(
    `DELETE FROM Users WHERE id='${id}';`,
    function (err, result) {
      if (err) {
        return res.status(400).json({
          message: "Unable to delete profile",
        });
      }
      return res.status(200).json({
        message: "Profile deleted",
      });
    }
  );
  // });
};

exports.updateProfile = (req, res, next) => {
  console.log("updating profile");
  const { id, email, firstName, lastName } = req.body;
  let { articlesRead } = req.body;
  articlesRead = JSON.stringify(articlesRead);
  console.log(req.body);
  console.log({ id, email, firstName, lastName, articlesRead });
  connection.query(
    `UPDATE Users SET firstName = '${firstName}', lastName = '${lastName}', articlesRead = '${articlesRead}' WHERE id = ${id}`,
    function (err, result) {
      if (err) {
        console.log("unable to update");
        return res.status(400).json({
          message: "Unable to update profile",
        });
      }
      console.log(chalk.magenta(res.id));
      return res.status(200).json({
        message: "Profile updated",
      });
    }
  );
};

exports.updatePassword = async (req, res, next) => {
  // connection.connect(() => {
  console.log("updating password");
  const { userId, password } = req.body;
  console.log(req.body);
  console.log(chalk.magenta(userId, password));

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  console.log(hashedPassword);
  connection.query(
    `UPDATE Users SET password = '${hashedPassword}' WHERE id = ${userId}`,
    function (error, result) {
      if (error) {
        return res.status(400).json({
          message: "Unable to change password",
        });
      }
      return res.status(200).json({
        message: "Password updated",
      });
    }
  );
  // });
};
