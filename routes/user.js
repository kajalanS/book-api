const conn = require("../services/database");
const { selectAll } = require("../services/query");
const user = require("express").Router();

const table = "users";

user
  .route("/")
  .get((req, res) => {
    conn.getConnection((err, con) => {
      if (err != null) return res.send({ error: err.message });

      con.query(select(table), (err, data, field) => {
        if (err != null) return res.send({ error: err.message });
        return res.send({ data: data });
      });
    });
  })
  .put((req, res) => {
    return res.send(`create books`);
  });

user
  .route("/:id")
  .get((req, res) => {
    return res.send(`get ${req.params.id} books`);
  })
  .put((req, res) => {
    return res.send(`update ${req.params.id} books`);
  })
  .delete((req, res) => {
    return res.send(`delete ${req.params.id} books`);
  });

module.exports = user;
