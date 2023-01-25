const Workout = require("../models/workoutModel");
const Unit = require("../models/Unit");
const mongoose = require("mongoose");

// get all workouts
const getUnits = async (req, res) => {
  const user_id = req.user._id;

  const units = await Unit.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(units);
};

// get a single workout
const getUnit = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such chapter" });
  }

  const unit = await Unit.findById(id);

  if (!unit) {
    return res.status(404).json({ error: "No such chapter" });
  }

  res.status(200).json(unit);
};

// create a new class

const newUnit = async (req, res) => {
  const { title, classIds, unitIds } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!classIds) {
    emptyFields.push("classIds");
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
    const newunit = await Unit.create({
      title,
      classIds,
      unitIds,
      user_id,
    });
    res.status(200).json(newunit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteUnit = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const newunit = await Unit.findOneAndDelete({ _id: id });

  if (!newunit) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(newunit);
};

// update a workout
const updateUnit = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such class" });
  }

  const newunit = await Unit.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!newunit) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(newunit);
};

module.exports = {
  getUnits,
  getUnit,
  deleteUnit,
  updateUnit,
  newUnit,
};
