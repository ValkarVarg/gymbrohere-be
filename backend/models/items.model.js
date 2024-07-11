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
      SELECT ui.user_item_row_id, ui.user_id, ui.item_id, ui.display_location, ai.item_name, ai.item_img
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

  exports.newUserItem = (id, body) => {
    const {item_id, display_location} = body
	return db.query(`INSERT INTO usersItems (user_id, item_id, display_location) VALUES ($1, $2, $3) RETURNING *`, [id, item_id, display_location])
    .then(({ rows }) => {
		return rows[0];
	});
  };

  exports.changeUserItem = async (body) => {
	try {
	  const allowedFields = [
		'item_id',
		'display_location',
	  ];
  
	  const fields = [];
	  const values = [];
	  let query = 'UPDATE usersItems SET ';
  
	  Object.keys(body).forEach((key) => {
		if (allowedFields.includes(key)) {
		  fields.push(`${key} = $${values.length + 1}`);
		  values.push(body[key]);
		}
	  });
  
	  if (fields.length === 0) {
		throw new Error('No valid fields to update');
	  }
  
	  query += fields.join(', ');
	  query += ` WHERE users_item_row_id= $${fields.length + 1} RETURNING *`;
	  values.push(body.users_item_row_id);
  
	  const result = await db.query(query, values);
	  return result.rows[0];
	} catch (error) {
	  console.error('Error updating user:', error.message);
	  throw error;
	}
  };