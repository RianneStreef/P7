const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const articleCtrl = require("../controllers/article");

// router.post('/', auth, articleCtrl.createArticle);
// router.get('/', auth, articleCtrl.getAllArticles);
// router.delete('/', auth, articleCtrl.deleteArticle);
// router.post('/:id/like', auth, articleCtrl.likeArticle);

router.post("/", articleCtrl.createArticle);

module.exports = router;
