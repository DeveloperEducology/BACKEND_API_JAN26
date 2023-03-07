const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  unitIds: Array,
  type: {
    type: String,
  },
  title: {
    type: String
  },
  question:{ type: String },
  
  questionImage: { type: String },
  
  answers: Array,
  type: {
    type: String,
  },
  correct_answer: Array,
  type: {
    type: String,
  },
  answer_selected: {
    type: String
  },
  blank_answer: {
    type: String,
  },
  explanation: Array,
  type: {
    type: String
  },
  subject:{
    type: String
  },
  topic: {
    type: String
  },
  category: {
    type: String
  },
  difficulty: {
    type: String
  },
  ans_type: {
    type: String
  },
  user_id: {
    type: String,
    required: true
  },
  date: { type: Date, default: Date.now },

});

module.exports = mongoose.model("questions", questionSchema);
