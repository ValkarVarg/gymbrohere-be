const {getUser} = require('./controllers/users.controller')
const express = require("express");

const app = express();

app.use(express.json());

app.get("/api/users/:userid", getUser)

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    } else if (err.code) {
      res.status(400).send({ msg: "Bad Request" });
    } else {
      res.status(500).send({ msg: "Internal Server Error" });
    }
  });

module.exports = app