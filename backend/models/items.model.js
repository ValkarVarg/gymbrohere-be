const db = require("../connection.js");

exports.fetchItems = () => {
  return db.query(`SELECT * FROM availableItems`).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
    return rows;
  });
};

exports.fetchUserItems = (id) => {
    return db.query(`
      SELECT ui.user_id, ui.item_id, ui.display_location, ai.item_name, ai.item_img
      FROM usersItems ui
      JOIN availableItems ai ON ui.item_id = ai.item_id
      WHERE ui.user_id = $1
    `, [id]).then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return rows;
    });
  };
