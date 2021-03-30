const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const articleCtrl = require("../controllers/article");

router.get("/", articleCtrl.getAll);
router.get("/:id", articleCtrl.getOne);
router.put("/", articleCtrl.update);
router.post("/", articleCtrl.likeArticles);

module.exports = router;
