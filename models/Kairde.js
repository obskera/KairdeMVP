const mongoose = require("mongoose");

const KairdeSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    required: true,
  },
  public: {
    type: Boolean,
    required: true,
    default: false,
  },
  link: {
    type: String,
    default: '',
  },
  dataURL: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: 'contact'
  },
  //this one may not be needed?
//   kairde: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Kairde",
//   },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Kairde", KairdeSchema);
