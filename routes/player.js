const playerRouter = require("express").Router();
const btoa = require("btoa");
const msf = require("../config/publicKeys");
const request = require("request");

//@season in the format of year-playoff or year-year-regular
//@player in the foramt of firstName-lastName or lastName
playerRouter.get("/:season/:player", function(req, res) {
  let params = req.params;
  let _player = params.player.trim().replace(/\s+/g, "-");
  let season = params.season;
  let _url =
    "https://www.mysportsfeeds.com/api/feed/pull/nba/" +
    season +
    "/cumulative_player_stats.json";
  let options = {
    url: _url,
    headers: {
      Authorization:
        "Basic " +
        btoa(msf.mysportsfeedUsername + ":" + msf.mysportsfeedPassword)
    },
    qs: {
      playerstats: "MIN/G,+/-/G,BS/G,STL/G,TOV/G,PTS/G,AST/G,REB/G,FT%,FG%,3P%",
      player: _player
    }
  };
  request.get(options, (err, _res, body) => {
    if (!err && _res.statusCode == 200) {
      console.log("GET handler for /player route.");
      res.send(body);
    }
  });
});

module.exports = playerRouter;
