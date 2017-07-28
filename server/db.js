var mysql = require("mysql"),
  async = require("async");

var PRODUCTION_DB = "nbastats",
  TEST_DB = "nbastats_test";

exports.MODE_TEST = "mode_test";
exports.MODE_PRODUCTION = "mode_production";

var state = {
  pool: null,
  mode: null
};

exports.connect = function(mode, done) {
  state.pool = mysql.createPool({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "",
    database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
  });

  state.mode = mode;
  done();
};

exports.get = function() {
  return state.pool;
};

exports.createDataBase = () => {
  var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
  });

  db.connect(function(err) {
    if (err) throw err;
    db.query("CREATE DATABASE IF NOT EXISTS nbastats", function(err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });
};

exports.createTables = () => {
  var pool = state.pool;
  if (!pool) return done(new Error("Missing database connection."));

  pool.query(
    `CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    given_name varchar(20) not null,
    family_name varchar(20) not null,
    name varchar(20) not null,    
    sub text not null,
    PRIMARY KEY (id)
   )`,
    (err, res) => {
      //if (err) throw err;
      console.log("User table created");
    }
  );
};

exports.fixtures = function(data, done) {
  var pool = state.pool;
  if (!pool) return done(new Error("Missing database connection."));

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
            "INSERT INTO " +
              name +
              " (" +
              keys.join(",") +
              ") VALUES (" +
              values.join(",") +
              ")",
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
  if (!pool) return done(new Error("Missing database connection."));

  async.each(
    tables,
    function(name, cb) {
      pool.query("DELETE * FROM " + name, cb);
    },
    done
  );
};
