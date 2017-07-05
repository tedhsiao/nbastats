const playerRouter = require("express").Router();
const btoa = require("btoa");
const msf = require("../config/publicKeys");
const request = require("request");

playerRouter.get("/:player", function(req, res) {
  let params = req.params;
  let _player = params.player.trim().replace(/\s+/g, "-");
  let options = {
    url:
      "https://www.mysportsfeeds.com/api/feed/pull/nba/2017-playoff/cumulative_player_stats.json",
    headers: {
      Authorization:
        "Basic " +
        btoa(msf.mysportsfeedUsername + ":" + msf.mysportsfeedPassword)
    },
    qs: {
      playerstats: "2PA,2PM,3PA,3PM,FTA,FTM",
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
