const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  unitIds: Array,
  type: {
    type: String,
  },
  title: {
    type: String
  },
  question: Array,
  type:{ type: String },
  
  answers: Array,
  type: {
    type: String,
  },
  correct_answer: Array,
  type: {
    type: String,
  },
  blank_answer: {
    type: String,
  },
  explanation: Array,
  type: {
    type: String
  },
  subject_type: Array,
  type: {
    type: String
  },
  difficuly: {
    type: String
  },
  question_type: {
    type: String
  },
  user_id: {
    type: String,
    required: true
  },
  date: { type: Date, default: Date.now },

});

module.exports = mongoose.model("questions", questionSchema);
