const leagueRouter = require("express").Router();
const btoa = require("btoa");
const config = require("../config/config");
const request = require("request");
const jwt = require("express-jwt");
const { protectedAPI } = require("../middleware");
const db = require("../db");

leagueRouter.get("/", protectedAPI, (req, res) => {
  let { userId } = req.query;
  db.get().query(`select leagues.name, leagues.id
                from leagues
                inner join league_user on league_user.league_id = leagues.id
                where league_user.user_id = '${userId}'`, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    if (data.length) {
      res.send(data);
    }
  });
});

leagueRouter.post("/", protectedAPI, (req, res) => {
  let { name } = req.body;
  let { email } = req.user;
  db
    .get()
    .query(
      `insert into leagues (name) values ('${name}')`,
      (err, newLeague) => {
        if (newLeague) {
          db.get().query(`select users.id 
               from users
               where users.email='${email}'`, (err, data) => {
            console.log(err);
            if (data) {
              db
                .get()
                .query(
                  `insert into league_user (user_id, league_id) values ('${data[0]
                    .id}', ${newLeague.insertId})`,
                  (err, data) => {
                    console.log(err);
                    if (data) {
                      res.send({ message: "league created" });
                    }
                  }
                );
            }
          });
        }
      }
    );
});

module.exports = leagueRouter;
