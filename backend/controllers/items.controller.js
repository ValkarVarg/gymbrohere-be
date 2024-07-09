const {
    fetchItems,
    fetchUserItems
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
    const id = req.params.user_id
    fetchUserItems(id)
      .then((items) => {
        res.status(200).send({ items: items });
      })
      .catch(next);
  };