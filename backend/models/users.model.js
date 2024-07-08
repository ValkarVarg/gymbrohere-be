const db = require('../connection.js');

exports.fetchUser = (id) => {
	return db
		.query(
			`SELECT users.*, usersLogin.username FROM users
                JOIN usersLogin
                ON users.user_id = usersLogin.user_id
                WHERE users.user_id = $1`,
			[id]
		)
		.then(({ rows }) => {
			if (rows.length === 0) {
				return Promise.reject({ status: 404, msg: 'Not Found' });
			}
			return rows;
		});
};

exports.fetchUserLogin = (username) => {
	return db.query(`SELECT * FROM usersLogin WHERE username = $1`, [username]).then(({ rows }) => {
		if (rows.length === 0) {
			return Promise.reject({ status: 404, msg: 'Not Found' });
		}
		return rows[0];
	});
};

exports.newUserLogin = (userLogin) => {
	const { username, password, email } = userLogin;
	return db.query(`INSERT INTO userslogin (username, password, email) VALUES ($1, $2, $3) RETURNING *`, [username, password, email]).then(({ rows }) => {
		return rows[0];
	});
};

exports.newUser = (user, id) => {
	const { birthdate, height, weight, goal, avatar_body, avatar_hair_shape, avatar_hair_colour, avatar_skin_colour, avatar_shirt_colour } = user;

	return db
		.query(
			`INSERT INTO users (birthdate, height, weight, goal, avatar_body, avatar_hair_shape, avatar_hair_colour, avatar_skin_colour, avatar_shirt_colour, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
			[birthdate, height, weight, goal, avatar_body, avatar_hair_shape, avatar_hair_colour, avatar_skin_colour, avatar_shirt_colour, id]
		)
		.then(({ rows }) => {
			return rows[0];
		});
};


exports.updateUser = async (body, id) => {
	try {
	  const allowedFields = [
		'birthdate',
		'height',
		'weight',
		'goal',
		'avatar_body',
		'avatar_hair_shape',
		'avatar_hair_colour',
		'avatar_skin_colour',
		'avatar_shirt_colour',
		'experience',
		'complete_workouts'
	  ];
  
	  const fields = [];
	  const values = [];
	  let query = 'UPDATE users SET ';
  
	  Object.keys(body).forEach((key, index) => {
		if (allowedFields.includes(key)) {
		  fields.push(`${key} = $${index + 1}`);
		  values.push(body[key]);
		}
	  });
  
	  if (fields.length === 0) {
		throw new Error('No valid fields to update');
	  }
  
	  query += fields.join(', ');
	  query += ` WHERE user_id = $${fields.length + 1} RETURNING *`;
	  values.push(id);
  
	  const result = await db.query(query, values);
	  return result.rows[0];
	} catch (error) {
	  console.error('Error updating user:', error.message);
	  throw error;
	}
  };

