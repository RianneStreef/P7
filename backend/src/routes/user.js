const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user");

router.put("/login", userCtrl.login);
router.post("/signup", userCtrl.signup);
router.delete("/:id", userCtrl.deleteProfile);

router.put("/user", auth, userCtrl.updateProfile);
router.put("/password", auth, userCtrl.updatePassword);

module.exports = router;
