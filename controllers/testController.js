const Workout = require("../models/workoutModel");
const Test = require("../models/Test");
const mongoose = require("mongoose");

// get all workouts
const getTests = async (req, res) => {
  const user_id = req.user._id;

  const tests = await Test.find().sort({ createdAt: -1 });
  // const questions = await Question.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(tests);
};

// get a single workout
const getTest = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such test" });
  }

  const test = await Test.findById(id);

  if (!test) {
    return res.status(404).json({ error: "No such test" });
  }

  res.status(200).json(test);
};

// create a new class

const newTest = async (req, res) => {
  const { title, question_id } = req.body;

  let emptyFields = [];

 
  if (!question_id) {
    emptyFields.push("question_id");
  }
  if (!title) {
    emptyFields.push("title");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const newtest = await Test.create({
        title, question_id, user_id
    });
    res.status(200).json(newtest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  getTests,
  getTest,
  newTest,
};
