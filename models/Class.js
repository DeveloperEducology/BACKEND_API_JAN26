const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
 title: { type: String },
 color: {type: String},
 width: {type: String},
 description: {type: String},
 user_id: {
  type: String,
  required: true
},
  date: { type: Date, default: Date.now },

});

module.exports = mongoose.model("classes", classSchema);
