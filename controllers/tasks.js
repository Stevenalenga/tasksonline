const Task = require("../models/taskSchema");
const asyncwrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const createTasks = asyncwrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});
const getallTasks = asyncwrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});
const getTask = asyncwrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ id: taskID });
  if (!task) {
    return next(createCustomError({ msg: " the said post does not exist" }));
    //return res.status(404).json({ msg: "the said post does not exis" });
  }
  res.status(200).json({ task });
});

const deleteTasks = asyncwrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ id: taskID });
  if (!task) {
    return next(
      createCustomError({
        msg: `the said id ${taskID} does not exist or has been deleted`,
      })
    );
  }
  res.status(200).json({ task: null, status: "success" });
});
const updateTasks = asyncwrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(
      createCustomError({
        msg: `the said id ${taskID} does not exist or has been deleted`,
      })
    );
  }
  res.status(200).json({ task });
});
const editTasks = asyncwrapper(async (req, res) => {
  const task = await Task.findOneAndUpdate({ id: taskID }, req.body, {
    new: true,
    runValidators: true,
    overwrite: true,
  });
  if (!task) {
    return next(
      createCustomError({
        msg: `the said id ${taskID} does not exist or has been deleted`,
      })
    );
  }

  res.status(200).json({ task });
});

module.exports = {
  getallTasks,
  getTask,
  createTasks,
  updateTasks,
  deleteTasks,
  editTasks,
};
