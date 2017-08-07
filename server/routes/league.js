const leagueRouter = require('express').Router();
const btoa = require('btoa');
const config = require('../config/config');
const request = require('request');
const jwt = require('express-jwt');
const { protectedAPI } = require('../middleware');
const db = require('../db');

leagueRouter.get('/', protectedAPI, (req, res) => {
  let { userId } = req.query;
  if (userId) {
    db
      .get()
      .query(
        `select leagues.name, leagues.id, leagues.capacity, leagues.numOfPlayers, leagues.creator
                from leagues
                inner join league_user on league_user.league_id = leagues.id
                where league_user.user_id = '${userId}'`,
        (err, data) => {
          if (err) {
            console.log(err);
            res.send(err);
            return;
          }
          if (data.length) {
            res.send(data);
            return;
          }
          res.send([]);
        }
      );
  } else {
    db
      .get()
      .query(
        `select leagues.name, leagues.id, leagues.capacity, leagues.numOfPlayers, leagues.creator
                from leagues`,
        (err, data) => {
          if (err) {
            console.log(err);
            res.send(err);
            return;
          }
          if (data.length) {
            res.send(data);
            return;
          }
          res.send([]);
        }
      );
  }
});

leagueRouter.post('/', protectedAPI, (req, res) => {
  let { name, numOfPlayers, capacity } = req.body;
  let { email } = req.user;
  db
    .get()
    .query(
      `insert into leagues (name, numOfPlayers, capacity) values ('${name}','${numOfPlayers}','${capacity}')`,
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
                      res.send({ message: 'league created' });
                    }
                  }
                );
            }
          });
        }
      }
    );
});

leagueRouter.post('/join', protectedAPI, (req, res) => {
  let { leagueId } = req.body;
  let { email } = req.user;
  db.get();
  db.get().query(`select users.id 
               from users
               where users.email='${email}'`, (err, users) => {
    console.log(err);
    if (users) {
      db
        .get()
        .query(
          `insert into league_user (user_id, league_id) values ('${users[0]
            .id}', ${leagueId})`,
          (err, data) => {
            console.log(err);
            if (data) {
              console.log(data);
              res.send({ message: `User ${users[0].id} joined ${leagueId}` });
            }
          }
        );
    }
  });
});

module.exports = leagueRouter;
