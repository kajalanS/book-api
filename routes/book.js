const book = require("express").Router();
const conn = require("../services/database");
const {
  selectAll,
  selectSingle,
  softDeleteSingle,
} = require("../services/query");

const table = "books";

book
  .route("/")
  .get((req, res) => {
    conn.getConnection((err, con) => {
      if (err != null) return res.send({ error: err.message });

      con.query(selectAll(table), (err, data, field) => {
        if (err != null) return res.send({ error: err.message });
        return res.send({ data: data });
      });
    });
  })

  .put((req, res) => {
    conn.getConnection((err, con) => {
      if (err != null) return res.send({ error: err.message });
      const value = {
        title: req.body.title,
        author: req.body.author,
        type: req.body.type,
        description: req.body.description,
      };
      con.query("insert into books set ?", [value], (err, data, field) => {
        if (err != null) return res.send({ error: err.message });
        return res.send({ data: data });
      });
    });
  });

book
  .route("/:id")
  .get((req, res) => {
    if (!req.params.id) return res.send({ error: "param id is missing." });

    conn.getConnection((err, con) => {
      if (err != null) return res.send({ error: err.message });

      con.query(selectSingle(table, req.params.id), (err, data, field) => {
        if (err != null) return res.send({ error: err.message });
        return res.send({ data: data });
      });
    });
  })

  .put((req, res) => {
    if (!req.params.id) return res.send({ error: "param id is missing." });

    conn.getConnection((err, con) => {
      if (err != null) return res.send({ error: err.message });
      const value = {
        title: req.body.title,
        author: req.body.author,
        type: req.body.type,
        description: req.body.description,
      };
      con.query(
        "update books set ? where id = ?",
        [value, req.params.id],
        (err, data, field) => {
          if (err != null) return res.send({ error: err.message });

          con.query(selectSingle(table, req.params.id), (err, data, field) => {
            if (err != null) return res.send({ error: err.message });
            return res.send({ data: data });
          });
        }
      );
    });
  })

  .delete((req, res) => {
    if (!req.params.id) return res.send({ error: "param id is missing." });

    conn.getConnection((err, con) => {
      if (err != null) return res.send({ error: err.message });

      con.query(softDeleteSingle(table, req.params.id), (err, data, field) => {
        if (err != null) return res.send({ error: err.message });
        return res.send({ data: data });
      });
    });
  });

module.exports = book;
