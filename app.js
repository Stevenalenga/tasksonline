const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectdb = require("./database/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");

//middleware
//app.use(express.static("./public"));
app.use(express.json());

//routes

app.get("/", (req, res) => {
  res.send("hello steven");
});

app.use("/api/v1/tasks", tasks);

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
