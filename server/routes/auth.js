const authRouter = require("express").Router();
const db = require("../db");

authRouter.post("/user", (req, res) => {
  let { id_token_payload, id_token, access_token } = req.body;
  let user = {
    name: id_token_payload.name,
    given_name: id_token_payload.given_name,
    family_name: id_token_payload.family_name,
    sub: id_token_payload.sub
  };

  db
    .get()
    .query(
      `select * from users where sub = '${id_token_payload.sub}'`,
      (err, data) => {
        if (data.length) {
          res.send({ message: "user exist in database" });
          return;
        }
        db.get().query("INSERT INTO users SET ?", user, function(err, data) {
          if (err) throw err;
          console.log("Last record insert id:", data.insertId);
          res.send({ message: "user created" });
        });
      }
    );
});

module.exports = authRouter;
