const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { connection } = require("../db");

exports.login = async (req, res, next) => {
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
};

exports.signup = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  let { articlesRead } = req.body;
  articlesRead = JSON.stringify(articlesRead);
  if (
    !req?.body?.password ||
    !req?.body?.email ||
    !req?.body?.firstName ||
    !req?.body?.lastName
  ) {
    return res.status(400).json({
      message: "Incomplete input",
    });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  let insertId = "";
  try {
    connection.query(
      `INSERT INTO Users (firstName, lastName, email, password, articlesRead)
        VALUES ('${firstName}', '${lastName}', '${email}', '${hashedPassword}' ,'${articlesRead}');`,
      function (err, result) {
        if (err) {
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
  } catch (err) {}
};

exports.deleteProfile = (req, res, next) => {
  const id = req.params.id;
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
};

exports.updateProfile = (req, res, next) => {
  const { id, email, firstName, lastName } = req.body;
  let { articlesRead } = req.body;
  articlesRead = JSON.stringify(articlesRead);
  connection.query(
    `UPDATE Users SET firstName = '${firstName}', lastName = '${lastName}', articlesRead = '${articlesRead}' WHERE id = ${id}`,
    function (err, result) {
      if (err) {
        return res.status(400).json({
          message: "Unable to update profile",
        });
      }
      return res.status(200).json({
        message: "Profile updated",
      });
    }
  );
};

exports.updatePassword = async (req, res, next) => {
  const { id: userId, password } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
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
};
