const scheduleRouter = require("express").Router();
const btoa = require("btoa");
const msf = require("../config/publicKeys");
const request = require("request");

//@season in the format of year-playoff or year-year-regular
//@date in the foramt of YYYYMMDD
scheduleRouter.get("/:season/:date", function(req, res) {
  let params = req.params;
  let season = params.season;
  let date = params.date;
  let _url = `https://www.mysportsfeeds.com/api/feed/pull/nba/${season}/scoreboard.json?fordate=${date}`;
  let options = {
    url: _url,
    headers: {
      Authorization:
        "Basic " +
        btoa(msf.mysportsfeedUsername + ":" + msf.mysportsfeedPassword)
    }
  };
  request.get(options, (err, _res, body) => {
    if (!err && _res.statusCode == 200) {
      console.log("GET handler for /schedule route.");
      res.send(body);
    }
  });
});

scheduleRouter.get("/boxscore/:season/:date/:teams", function(req, res) {
  let params = req.params;
  let season = params.season;
  let gameid = params.date + "-" + params.teams;
  let _url = `https://www.mysportsfeeds.com/api/feed/pull/nba/${season}/game_boxscore.json?gameid=${gameid}`;
  let options = {
    url: _url,
    headers: {
      Authorization:
        "Basic " +
        btoa(msf.mysportsfeedUsername + ":" + msf.mysportsfeedPassword)
    }
  };
  request.get(options, (err, _res, body) => {
    console.log(body);
    if (!err && _res.statusCode == 200) {
      console.log("GET handler for /schedule/boxscore route.");
      res.send(body);
    }
  });
});

module.exports = scheduleRouter;
