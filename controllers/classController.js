const Workout = require("../models/workoutModel");
const Class = require("../models/Class");
const Chapter = require("../models/Chapter");
const Unit = require("../models/Unit");
const Element = require("../models/Question");
const mongoose = require("mongoose");

// get all workouts
const getClasses = async (req, res) => {
  const user_id = req.user._id;

  const classes = await Class.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(classes);
};

// get a single workout
const getClass = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such class" });
  }

  const newclass = await Class.findById(id);

  if (!newclass) {
    return res.status(404).json({ error: "No such class" });
  }

  res.status(200).json(newclass);
};

// create a new class

const newClass = async (req, res) => {
  const { title, color, width, description } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!color) {
    emptyFields.push("color");
  }
  if (!width) {
    emptyFields.push("width");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const newclass = await Class.create({
      title,
      color,
      width,
      description,
      user_id,
    });
    res.status(200).json(newclass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteClass = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const newclass = await Class.findOneAndDelete({ _id: id });

  if (!newclass) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(newclass);
};

// update a workout
const updateClass = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such class" });
  }

  const newclass = await Class.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!newclass) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(newclass);
};

module.exports = {
  getClasses,
  getClass,
  deleteClass,
  updateClass,
  newClass,
};
