const jwt = require("jsonwebtoken");
const chalk = require("chalk");

module.exports = (req, res, next) => {
  console.log(chalk.magenta(req.body.id));
  console.log(chalk.magenta("comparing tokens"));
  try {
    const token = req.body.token;
    //.split(" ")[1];
    console.log(chalk.blueBright(token));
    const decodedToken = jwt.verify(token, "ksjghdfliSGvligSBDLVb");
    const userId = decodedToken.userId;
    console.log(req.body.id);
    console.log(chalk.blueBright(decodedToken));
    console.log(chalk.greenBright(userId));

    if (req.body.id && req.body.id !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      message: "Invalid request!",
    });
  }
};
