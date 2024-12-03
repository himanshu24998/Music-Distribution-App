const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user_model");
const jwt = require("jsonwebtoken");
const path = require("path");
// const { Buffer } = require("buffer");
// const { auth } = require("googleapis/build/src/apis/abusiveexperiencereport");
require("dotenv").config();
const helpSupportRoutes = require("./Routes/helpSupportRoutes");
const trackRoutes = require("./Routes/trackRoutes");
const authRouter = require("./Routes/AuthRouter");

const DB_URL =
  process.env.USE_ATLAS === "true"
    ? process.env.MONGO_DB_URL
    : process.env.LOCAL_DB_URL;

console.log("Using database URL:", DB_URL);

mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Cannot connect to the database", err));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "TrackUploads")));
app.use("/api", helpSupportRoutes);
app.use("/track-upload", trackRoutes);
app.use("/api/tracks", trackRoutes);

mongoose
  .connect("mongodb://localhost:27017/help_support_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

app.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    res.json({
      status: "ok",
    });
  } catch (error) {
    res.json({
      status: "Error",
      error: "Duplicate email",
    });
  }
});
app.post("/login", async (req, res) => {
  console.log(req.body);

  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        email: user.email,
      },
      "secret123"
    );

    return res.json({
      status: "ok",
      user: token,
    });
  } else {
    return res.json({
      status: "error",
      user: false,
    });
  }
  // res.json({
  //   status: "ok",
  // });
});

app.get("/", (req, res) => {
  res.send("<h1>This is a Node.js server</h1>");
});

app.use("/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running at port http://localhost:${PORT}`);
});
