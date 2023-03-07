const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    title: {
      type: String
    },
  question_id: Array,
  type: {
    type: String,
  },
  user_id: {
    type: String,
    required: true
  },
  date: { type: Date, default: Date.now },

});

module.exports = mongoose.model("tests", testSchema);
