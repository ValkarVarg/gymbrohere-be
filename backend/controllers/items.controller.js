const {
  fetchItems,
  fetchUserItems,
  newUserItem,
  changeUserItem,
} = require("../models/items.model");
const { checkExists, validateUser } = require("../utils/utils.js");

exports.getItems = (req, res, next) => {
  fetchItems()
    .then((items) => {
      res.status(200).send({ items: items });
    })
    .catch(next);
};

exports.getUserItems = (req, res, next) => {
  const id = req.params.user_id;
  fetchUserItems(id)
    .then((items) => {
      res.status(200).send({ items: items });
    })
    .catch(next);
};

exports.postUserItem = (req, res, next) => {
  const id = req.params.user_id;
  const body = req.body;
  newUserItem(id, body)
    .then((item) => {
      res.status(201).send({ item: item });
    })
    .catch(next);
};

exports.patchUserItem = (req, res, next) => {
  const body = req.body;
  changeUserItem(body)
    .then((item) => {
      res.status(200).send({ item: item });
    })
    .catch(next);
};
