const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user");

router.put("/login", userCtrl.login);
router.post("/signup", userCtrl.signup);
router.delete("/:id", userCtrl.deleteProfile);

router.put("/user", userCtrl.updateProfile);
router.put("/password", userCtrl.updatePassword);

module.exports = router;
