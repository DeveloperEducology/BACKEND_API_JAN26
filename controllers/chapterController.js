const Workout = require("../models/workoutModel");
const Chapter = require("../models/Chapter");
const mongoose = require("mongoose");

// get all workouts
const getChapters = async (req, res) => {
  const user_id = req.user._id;

  const chapters = await Chapter.find({}).sort({ createdAt: -1 });

  res.status(200).json(chapters);
};

// get a single workout
const getChapter = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such chapter" });
  }

  const chapter = await Class.findById(id);

  if (!chapter) {
    return res.status(404).json({ error: "No such chapter" });
  }

  res.status(200).json(chapter);
};

// create a new class

const newChapter = async (req, res) => {
    const { title, classIds} = req.body;


  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
if(!classIds) {
    emptyFields.push("classIds")
}
  
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
   
    const user_id = req.user._id;
    const newchapter = await Chapter.create({
      title,
      classIds,
      user_id,
    });
    res.status(200).json(newchapter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteChapter = async (req, res) => {
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
const updateChapter = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such class" });
  }

  const newclass = await Workout.findOneAndUpdate(
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
  getChapters,
  getChapter,
  deleteChapter,
  updateChapter,
    newChapter,

};
