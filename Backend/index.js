const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);
const colors = require("colors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./Routes/auth");
const taskRoutes = require("./Routes/task");
const tags = require("./Routes/category");
const notification = require("./Routes/notification");
const { notificationJob } = require("./Jobs/jobs");

const port = process.env.PORT || 5000;
const app = express();

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("> Connected...".bgCyan))
  .catch((err) =>
    console.log(
      `> Error while connecting to mongoDB : ${err.message}`.underline.red
    )
  );

var store = new MongoDBStore({
  uri: process.env.DATABASE,
  collection: "mySessions",
});

store.on("error", function (error) {
  console.error("Session store error:", error);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 3,
    },
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("hello from the notes server)");
});

app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);
app.use("/tags", tags);
app.use("/notifications", notification);

notificationJob();

app.listen(port, () =>
  console.log("Server is up and running on port : " + port)
);
