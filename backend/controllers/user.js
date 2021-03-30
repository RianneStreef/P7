const express = require('express');
const app = express();

const mysql = require('mysql');
const chalk = require('chalk');
const axios = require('axios').default;
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const { connection } = require('../db');

/* const connection = mysql.createConnection({
  host: 'remotemysql.com',
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: 'OXgD76ZhvJ',
});
 */
exports.login = (req, res, next) => {
  console.log('finding user');
  const { email, password } = req.body;
  console.log(email);
  console.log(chalk.magenta(password));
  connection.query(
    `SELECT password, id, firstName, lastName FROM Users WHERE email='${email}';`,
    async function (err, result) {
      if (err) {
        return res.status(400).json({
          message: 'Unable to login',
        });
      }
      console.log(result);
      console.log(result[0].password);
      console.log(result[0].firstName);
      const hash = result[0].password;
      const data = password;
      console.log(chalk.yellow(hash));
      console.log(chalk.blue(data));
      const comparedPassword = await bcrypt.compare(data, hash);
      if (comparedPassword === true) {
        console.log(comparedPassword);
        console.log(result);
        // const token = jwt.sign({ userId: user._id }, "ksjghdfliSGvligSBDLVb", {
        //   expiresIn: "24h",
        // });
        // res.status(200).json({
        //   userId: user._id,
        //   token: token,
        // });
        return res.status(200).json({
          user: result,
          message: 'Logged in',
        });
      } else {
        return res.status(400).json({
          message: 'Could not log in',
        });
      }
    },
  );
};

exports.signup = async (req, res, next) => {
  console.log('signing up');
  const { email, password, firstName, lastName } = req.body;
  let { articlesRead } = req.body;
  articlesRead = JSON.stringify(articlesRead);
  console.log(email, password, firstName, lastName, articlesRead);

  // Check if all fields are submitted
  // Validate each of the fields
  // You can use the Validator library
  if (!req?.body?.password) {
    return res.status(400).json({
      message: 'Incorrect input',
      field: '',
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  console.log(hashedPassword);
  let insertId = '';
  console.log(connection);
  try {
    connection.query(
      `INSERT INTO Users (firstName, lastName, email, password, articlesRead)
        VALUES ('${firstName}', '${lastName}', '${email}', '${hashedPassword}' ,'${articlesRead}');`,
      function (err, result) {
        console.log(err);
        console.log(chalk.magenta(result));
        console.log(result.insertId);
        if (err) {
          console.log(err);
          if (err.errno && err.errno === 1062) {
            return res.status(400).json({
              message: 'Error. Duplicate email field',
              field: 'email',
            });
          }
          // THIS IS FOR DEMO, TAKE OUT OR REWORK
          // The field shows which control on frontend had an error
          if (err.errno && err.errno === 9999999) {
            return res.status(400).json({
              message: 'Error. Username invalid syntax',
              field: 'username',
            });
          }
          /* return res.status(500).json({
              message: 'Unknown error',
            }); */
        }
        insertId = result.insertId;
        console.log(chalk.blue(insertId));
        // const token = jwt.sign({ userId: user._id }, "ksjghdfliSGvligSBDLVb", {
        //   expiresIn: "24h",
        // });
        // res.status(200).json({
        //   userId: user._id,
        //   token: token,
        // });
        return res.status(200).json({
          user: {
            email,
            firstName,
            lastName,
            articlesRead,
            id: insertId,
          },
        });
      },
    );
  } catch (err) {
    console.log('MAJOR ERROR');
    console.log(err);
  }
};

exports.deleteProfile = (req, res, next) => {
  console.log(req.params.id);
  const id = req.params.id;

  connection.query(
    `DELETE FROM Users WHERE id='${id}';`,
    function (err, result) {
      if (err) {
        return res.status(400).json({
          message: 'Unable to delete profile',
        });
      }
      return res.status(200).json({
        message: 'Profile deleted',
      });
    },
  );
};

exports.updating = (req, res, next) => {
  console.log('updating profile');
  const { id, email, firstName, lastName } = req.body;
  let { articlesRead } = req.body;
  articlesRead = JSON.stringify(articlesRead);
  console.log(req.body);
  console.log({ id, email, firstName, lastName, articlesRead });
  connection.query(
    `UPDATE Users SET firstName = '${firstName}', lastName = '${lastName}', articlesRead = '${articlesRead}' WHERE id = ${id}`,
    function (err, result) {
      console.log('err');
      console.log(err);
      if (err) {
        return res.status(400).json({
          message: 'Unable to update profile',
        });
      }
      return res.status(200).json({
        message: 'Profile updated',
      });
    },
  );
};

exports.updatePassword =
  ('/api/auth/password',
  async (req, res, next) => {
    console.log('updating password');
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
            message: 'Unable to change password',
          });
        }
        return res.status(200).json({
          message: 'Password updated',
        });
      },
    );
  });
