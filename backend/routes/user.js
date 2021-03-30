const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

router.put("/login", userCtrl.login);
router.post("/signup", userCtrl.signup);
router.delete("/:id", userCtrl.deleteProfile);

router.put("/user", userCtrl.updating);
router.put("/login", userCtrl.updatePassword);

module.exports = router;
