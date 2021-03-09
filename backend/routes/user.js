const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

// router.post('/signup', auth, userCtrl.signup);
// router.post('/login', auth, userCtrl.login);
// router.get('/:id', auth, userCtrl.getOneUser);
// router.put('/:id', auth, userCtrl.modifyUser);

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/:id", userCtrl.getOneUser);
router.put("/:id", userCtrl.modifyUser);

module.exports = router;
