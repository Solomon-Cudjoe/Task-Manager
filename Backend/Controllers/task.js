const User = require("../Models/auth");
const Task = require("../Models/task");
const Category = require("../Models/category");

exports.addTask = async (req, res) => {
  const { userId } = req.params;
  const { title, description, dueDate, priority } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  if (title === "" || title === undefined) {
    return res.status(404).json({ error: "Must add a title" });
  }

  const newTask = new Task({
    title,
    description,
    dueDate,
    userId,
    priority
  });

  await newTask.save();
  return res.status(200).json({ message: "Task added successfully", newTask });
};

//Routes for viewing and filtering

exports.getTasks = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const tasks = await Task.find({ userId });
  return res.status(200).json({ tasks });
};

exports.filterWithStatus = async (req, res) => {
  const { userId, status } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const tasks = await Task.find({ userId, status: status.toLowerCase() });
  return res.status(200).json({ tasks });
};

exports.filterWithPriority = async (req, res) => {
  const { userId, priority } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const tasks = await Task.find({ userId, priority: priority.toLowerCase() });
  return res.status(200).json({ tasks });
};

// Routes For Editing
exports.editTask = async (req, res) => {
  const { userId, taskId } = req.params;
  const { title, description, dueDate } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.title = title;
  task.description = description;
  task.dueDate = dueDate;

  await task.save();

  return res.status(200).json({
    message: "Successful",
  });
};

exports.changeStatus = async (req, res) => {
  const { userId, taskId } = req.params;
  const { status } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.status = status.toLowerCase();

  await task.save();

  return res.status(200).json({
    message: "Successfull",
    task,
  });
};

exports.changePriority = async (req, res) => {
  const { userId, taskId } = req.params;
  const { priority } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.priority = priority.toLowerCase();

  await task.save();

  return res.status(200).json({
    message: "Successfull",
    task,
  });
};

exports.assignTag = async (req, res) => {
  const { userId, taskId } = req.params;
  const { category } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.category = category;

  await task.save();

  return res.status(200).json({
    message: "Successfull",
    task,
  });
};

//Route For Deleting

exports.deleteTask = async (req, res) => {
  const { userId, taskId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const task = await Task.findByIdAndDelete(taskId);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  return res.status(200).json({ message: "Task removed" });
};
