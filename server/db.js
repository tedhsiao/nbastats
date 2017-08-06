var mysql = require('mysql'),
  async = require('async');
const config = require('./config/config');

var PRODUCTION_DB = 'nbastats',
  TEST_DB = 'nbastats_test';

exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';

var state = {
  pool: null,
  mode: null
};

exports.connect = function(mode, done) {
  state.pool = mysql.createPool({
    host: process.env.DATABASE_HOST || config.mysqlhost,
    user: process.env.DATABASE_USER || config.mysqluser,
    password: process.env.DATABASE_PASSWORD || config.mysqlpassword,
    database: process.env.DATABASE_NAME || config.mysqldb
  });

  state.mode = mode;
  done();
};

exports.get = function() {
  return state.pool;
};

let createTables = () => {
  var pool = state.pool;
  if (!pool) return done(new Error('Missing database connection.'));
  pool.query(
    `CREATE TABLE leagues (
    id INT NOT NULL AUTO_INCREMENT,
    name varchar(20) not null,
    numOfPlayers int,
    capacity int, 
    PRIMARY KEY (id)
   )`,
    (err, res) => {
      //if (err) throw err;
      console.log(err);
      console.log('league table created');
    }
  );
  pool.query(
    `CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    given_name varchar(20) not null,
    family_name varchar(20) not null,
    name varchar(20) not null,
    sub text not null,
    email text not null,
    phone varchar(12),
    gender varchar(6),
    dob varchar(20),
    PRIMARY KEY (id)
   )`,
    (err, res) => {
      //if (err) throw err;
      console.log('User table created');
    }
  );
  pool.query(
    `CREATE TABLE league_user (
    league_id text references leagues(id),
    user_id text references users(id) 
   )`,
    (err, res) => {
      //if (err) throw err;
      console.log(err);
      console.log('league_user table created');
    }
  );
};

exports.createDataBase = () => {
  var db = mysql.createConnection({
    host: process.env.DATABASE_HOST || config.mysqlhost,
    user: process.env.DATABASE_USER || config.mysqluser,
    password: process.env.DATABASE_PASSWORD || config.mysqlpassword
  });

  db.connect(function(err) {
    //if (err) throw err;
    db.query('CREATE DATABASE IF NOT EXISTS nbastats', function(err, result) {
      //if (err) throw err;
      console.log('Database created');
      createTables();
    });
  });
};

exports.fixtures = function(data, done) {
  var pool = state.pool;
  if (!pool) return done(new Error('Missing database connection.'));

  var names = Object.keys(data.tables);
  async.each(
    names,
    function(name, cb) {
      async.each(
        data.tables[name],
        function(row, cb) {
          var keys = Object.keys(row),
            values = keys.map(function(key) {
              return "'" + row[key] + "'";
            });

          pool.query(
            'INSERT INTO ' +
              name +
              ' (' +
              keys.join(',') +
              ') VALUES (' +
              values.join(',') +
              ')',
            cb
          );
        },
        cb
      );
    },
    done
  );
};

exports.drop = function(tables, done) {
  var pool = state.pool;
  if (!pool) return done(new Error('Missing database connection.'));

  async.each(
    tables,
    function(name, cb) {
      pool.query('DELETE * FROM ' + name, cb);
    },
    done
  );
};
