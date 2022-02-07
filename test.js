const express = require("express");
const app = express();
const connectdb = require("./database/connect");
require("dotenv").config();
const Task = require("./models/taskSchema");
const notFound = require("./middleware/not-found");

//middleware
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
app.post("/post", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
app.get("/:id", async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ id: taskID });
    if (!task) {
      return res
        .status(404)
        .json({ msg: "the said post does not exist or has been deleted" });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
app.delete("/:id", async (req, res) => {
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
});

app.put("/:id", async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ id: taskID }, req.body, {
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
});

app.use(notFound);

const port = 3000;

const start = async () => {
  try {
    await connectdb(process.env.MONGO_URI);
    app.listen(port, console.log(`app is is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
