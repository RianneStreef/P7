const mongoose = require("mongoose");
const sauceSchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  articleUrl: { type: String, required: true },
  tags: { type: [String], required: true},
  usersLiked: { type: [String], required: true},
  usersDisliked: { type: [String], required: true },
});

module.exports = mongoose.model("Sauce", sauceSchema);


