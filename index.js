const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const playerRouter = require("./routes/player");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/player", playerRouter);

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});
