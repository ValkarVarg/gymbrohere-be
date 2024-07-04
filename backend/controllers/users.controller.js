const { fetchUser } = require("../models/users.model");

exports.getUser = (req, res, next) => {
    const id = req.params.userid
    fetchUser(id)
    .then((user) => {
      res.status(200).send({"user": user[0]});
    })
    .catch(next);
};