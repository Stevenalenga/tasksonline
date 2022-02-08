const express = require("express");
const router = express.Router();

const {
  getallTasks,
  createTasks,
  getTask,
  updateTasks,
  deleteTasks,
  editTasks,
} = require("../controllers/tasks");

router.route("/").get(getallTasks).post(createTasks);
router
  .route("/:id")
  .get(getTask)
  .patch(updateTasks)
  .delete(deleteTasks)
  .put(editTasks);

module.exports = router;
