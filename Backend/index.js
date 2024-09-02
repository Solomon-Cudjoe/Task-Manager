require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/auth");
const taskRoutes = require("./Routes/task");
const tags = require("./Routes/category");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO;

mongoose
  .connect(MONGO, {
    dbName: "Task-Manager",
  })
  .then(() => {
    console.log("MongoDb connection successful!");
  })
  .catch((err) => {
    console.log("MongoDb connection failed", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("hello from the notes server)");
});
app.use("/task", taskRoutes);
app.use("/auth", authRoutes);
app.use("/tags", tags);

app.listen(PORT, () =>
  console.log("Server is up and running on port : " + PORT)
);
