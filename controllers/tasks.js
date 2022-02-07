const Task = require("../models/taskSchema");

const createTasks = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const getallTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ id: taskID });
    if (!task) {
      return res.status(404).json({ msg: "the said post does not exis" });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTasks = (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ id: taskID });
    if (!task) {
      return res.status(404).json({
        msg: `the said id ${taskID} does not exist or has been deleted`,
      });
    }
    res.status(200).json({ task: null, status: "success" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const updateTasks = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({
        msg: `the said id ${taskID} does not exist or has been deleted`,
      });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const editTasks = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({ id: taskID }, req.body, {
      new: true,
      runValidators: true,
      overwrite: true,
    });
    if (!task) {
      return res.status(404).json({
        msg: `no task with id : ${taskID}`,
      });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getallTasks,
  getTask,
  createTasks,
  updateTasks,
  deleteTasks,
  editTasks,
};
