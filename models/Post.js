const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    default: '',
    // required: true,
  },
  image: {
    type: String,
    default: '',
    require: true,
  },
  cloudinaryId: {
    type: String,
    default: '',
    require: true,
  },
  caption: {
    type: String,
    default: '',
    // required: true,
  },
  likes: {
    type: Number,
    default: 0,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  share: {
    type: Boolean,
    default: false
  },
  link: {
    type: String,
    unique: true
  }
});

module.exports = mongoose.model("Post", PostSchema);
