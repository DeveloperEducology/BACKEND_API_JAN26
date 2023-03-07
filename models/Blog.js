const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
      type: String
    },
  content: Array,
  type: {
    type: String,
  },
  user_id: {
    type: String,
    required: true
  },
  date: { type: Date, default: Date.now },

});

module.exports = mongoose.model("blogs", blogSchema);
