const jwt = require("jsonwebtoken");
const chalk = require("chalk");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "ksjghdfliSGvligSBDLVb");
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      console.log(chalk.magenta(req.body));
      console.log(chalk.magenta("comparing tokens"));
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
