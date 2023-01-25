const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  title: { type: String },
 
  classIds:  Array,
  type: {
    type: String,
  },
  unitIds:  Array,
  type: {
    type: String,
  },
  date: { type: Date, default: Date.now },
  
});

module.exports = mongoose.model("units", unitSchema);