const {
  fetchUser,
  fetchUserLogin,
  newUserLogin,
  newUser,
  updateUser,
} = require("../models/users.model");
const { checkExists, validateUser } = require("../utils/utils.js");

exports.getUser = (req, res, next) => {
  const id = req.params.userid;
  fetchUser(id)
    .then((user) => {
      res.status(200).send({ user: user[0] });
    })
    .catch(next);
};

exports.getUserLogin = (req, res, next) => {
  const username = req.params.username;
  fetchUserLogin(username)
    .then((userLogin) => {
      res.status(200).send({ userLogin });
    })
    .catch(next);
};

exports.postUserLogin = (req, res, next) => {
  const userLogin = req.body;
  newUserLogin(userLogin)
    .then((userLogin) => {
      res.status(201).send({ userlogin: userLogin });
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  const id = req.params.user_id;
  const user = req.body;
  checkExists("userslogin", "user_id", id)
    .then(() => {
      validateUser(user);
    })
    .then(() => {
      return newUser(user, id);
    })
    .then((newUser) => {
      res.status(201).send({ user: newUser });
    })
    .catch(next);
};

exports.patchUser = (req, res, next) => {
  const id = req.params.user_id;
  const body = req.body;
  checkExists("userslogin", "user_id", id)
    .then(() => {
      updateUser(body, id)
        .then((user) => {
          res.status(200).send({ user: user });
        })
        .catch(next);
    })
    .catch(next);
};
