const express = require("express");
const router = express.Router();

const articleCtrl = require("../controllers/article");

router.get("/", articleCtrl.getAll);
router.get("/:id", articleCtrl.getOne);
router.put("/", articleCtrl.update);
router.post("/", articleCtrl.addArticle);

module.exports = router;
