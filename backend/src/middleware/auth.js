const jwt = require("jsonwebtoken");
const chalk = require("chalk");

module.exports = (req, res, next) => {
  try {
    const token = req.body.token;
    const decodedToken = jwt.verify(token, "ksjghdfliSGvligSBDLVb");
    const userId = decodedToken.userId;
    if (req.body.id && req.body.id !== userId) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      message: "Invalid request!",
    });
  }
};
