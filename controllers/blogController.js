const Workout = require("../models/workoutModel");
const Blog = require("../models/Blog");
const mongoose = require("mongoose");

// get all workouts
const getBlogs = async (req, res) => {
  const user_id = req.user._id;

  const blogs = await Blog.find().sort({ createdAt: -1 });
  // const questions = await Question.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(blogs);
};

// get a single workout
const getBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such blog" });
  }

  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json({ error: "No such blog" });
  }

  res.status(200).json(blog);
};

// create a new class

const newBlog = async (req, res) => {
  const { title, content } = req.body;

  let emptyFields = [];

 
  if (!title) {
    emptyFields.push("title");
  }
  if (!content) {
    emptyFields.push("content");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const newblog = await Blog.create({
        title, content, user_id
    });
    res.status(200).json(newblog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  getBlogs,
  getBlog,
  newBlog,
};
