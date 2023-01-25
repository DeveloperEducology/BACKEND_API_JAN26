const Workout = require("../models/workoutModel");
const Question = require("../models/Question");
const mongoose = require("mongoose");

// get all workouts
const getQuestions = async (req, res) => {
  const user_id = req.user._id;

  const questions = await Question.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(questions);
};

// get a single workout
const getQuestion = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such chapter" });
  }

  const question = await Question.findById(id);

  if (!question) {
    return res.status(404).json({ error: "No such chapter" });
  }

  res.status(200).json(question);
};

// create a new class

const newQuestion = async (req, res) => {
  const { title, question, answers, correct_answer, blank_answer, explanation,subject_type, difficulty, question_type, unitIds } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!unitIds) {
    emptyFields.push("unitIds");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const newquestion = await Question.create({
        title, question, answers, correct_answer, blank_answer, explanation, subject_type, difficulty, question_type, unitIds, user_id
    });
    res.status(200).json(newquestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const newquestion = await Question.findOneAndDelete({ _id: id });

  if (!newquestion) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(newquestion);
};

// update a workout
const updateQuestion = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such class" });
  }

  const newquestion = await Question.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!newquestion) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(newquestion);
};

module.exports = {
  getQuestions,
  getQuestion,
  deleteQuestion,
  updateQuestion,
  newQuestion,
};
