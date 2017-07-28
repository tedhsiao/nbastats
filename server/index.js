const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8080;
const playerRouter = require("./routes/player");
const scheduleRouter = require("./routes/schedule");
const authRouter = require("./routes/auth");
const bodyParser = require("body-parser");

const API = "/api/";

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(path.join(__dirname, "../dist")));
app.use(API + "player", playerRouter);
app.use(API + "schedule", scheduleRouter);
app.use(API + "auth", authRouter);

app.get("/", function(req, res) {
  res.send("Hello World!");
});

const db = require("./db");

db.createDataBase();
db.connect(db.MODE_PRODUCTION, function(err) {
  if (err) {
    console.log("Database connection error");
  } else {
    console.log("Database connection successful");
  }
});

db.createTables();
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../dist/index.html"));
// });

app.listen(port, function() {
  console.log(`Example app listening on ${port} port!`);
});
