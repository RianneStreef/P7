const Article = require("../models/article");
const chalk = require("chalk");

exports.createArticle = (req, res, next) => {
  console.log("adding article");
  const {
    id,
    title,
    description,
    articleUrl,
    usersLiked,
    usersDisliked,
  } = JSON.parse(req.body.article);

  usersLiked = "";
  usersDisliked = "";

  const article = new Article({
    id,
    title,
    description,
    articleUrl,
    usersLiked,
    usersDisliked,
    imageUrl,
  });
  article
    .save()
    .then(() => {
      res.status(201).json({
        message: "Article saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};

exports.getAllArticles = (req, res, next) => {
  Article.find()
    .then((articles) => {
      console.log("getAllArticles: Success");
      res.status(200).json(articles);
    })
    .catch((error) => {
      console.log("getAllArticles: Fail");
      res.status(400).json({
        error,
      });
    });
};

exports.deleteArticle = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};

const removeLike = (ID, usersLiked) =>
  usersLiked.filter((likes) => likes !== ID);
const removeDislike = (ID, usersLiked) =>
  usersLiked.filter((likes) => likes !== ID);

exports.likeArticle = (req, res, next) => {
  const input = req.body.like;
  const ID = req.body.userId;

  Article.findOne(
    {
      _id: req.params.id,
    },
    (err, articleFound) => {
      if (err) {
        // Error is found
        console.log(chalk.red.inverse("Error"), err);
      } else {
        const { usersLiked, usersDisliked } = articleFound;
        let { likes, dislikes } = articleFound;

        const alreadyLiked = usersLiked.includes(ID);
        const alreadyDisliked = usersDisliked.includes(ID);

        if (input === 1) {
          if (!alreadyLiked && !alreadyDisliked) {
            likes += 1;
            usersLiked.push(ID);
            articleFound.likes = likes;

            articleFound.save();
            res.status(201).json({
              message: "Article successfully evaluated!",
            });
          }
        }

        if (input === -1) {
          if (!alreadyLiked && !alreadyDisliked) {
            dislikes += 1;
            usersDisliked.push(ID);
            articleFound.dislikes = dislikes;
            articleFound.save();
            res.status(201).json({
              message: "Article successfully evaluated!",
            });
          }
        }
        if (input === 0) {
          if (alreadyLiked) {
            likes -= 1;
            const newUsersLiked = removeLike(ID, usersLiked);

            articleFound.likes = likes;
            articleFound.usersLiked = newUsersLiked;

            articleFound.save();

            res.status(201).json({
              message: "Like deleted!",
            });
          }
          if (alreadyDisliked) {
            dislikes -= 1;
            const newUsersDisliked = removeDislike(ID, usersDisliked);

            articleFound.dislikes = dislikes;
            articleFound.usersDisliked = newUsersDisliked;

            articleFound.save();

            res.status(201).json({
              message: "Dislike deleted!",
            });
          }
        }
      }
    }
  );
};
