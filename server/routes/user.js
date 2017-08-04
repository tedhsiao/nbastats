const authRouter = require("express").Router();
const db = require("../db");

authRouter.get("/", (req, res) => {
  let { sub } = req.query;
  db.get().query(`select * from users where sub = '${sub}'`, (err, data) => {
    if (err) throw err;
    console.log(data[0]);
    res.send(data[0]);
  });
});

authRouter.post("/", (req, res) => {
  let { id_token_payload, id_token, access_token } = req.body;
  let user = {
    name: id_token_payload.name,
    given_name: id_token_payload.given_name,
    family_name: id_token_payload.family_name,
    sub: id_token_payload.sub,
    email: id_token_payload.email
  };
  // db.get().query(`select * from users`, (err, data) => {
  //   console.log(data);
  // });
  db
    .get()
    .query(
      `select * from users where sub = '${id_token_payload.sub}'`,
      (err, data) => {
        if (data.length) {
          res.send({ message: "user exist in database", userId: data[0].id });
          return;
        }
        db.get().query("INSERT INTO users SET ?", user, function(err, data) {
          if (err) throw err;
          console.log("Last record insert id:", data.insertId);
          res.send({ message: "user created", userId: data.insertId });
        });
      }
    );
});

authRouter.put("/", (req, res) => {
  let { name, email, dob, gender, phone, sub } = req.body;
  let user = {
    name,
    email,
    phone,
    gender,
    dob
  };
  db.get().query(`update users
       set name = '${user.name}',
           email = '${user.email}',
           phone = '${user.phone}',
           gender = '${user.gender}',
           dob = '${user.dob}',
           sub = '${sub}'
        where sub = '${sub}'`, (err, data) => {
    if (data.affectedRows) {
      db
        .get()
        .query(`Select * from users where sub = '${sub}'`, function(err, data) {
          if (err) throw err;
          console.log(data[0]);
          res.send(data[0]);
        });
    }
  });
});

module.exports = authRouter;
