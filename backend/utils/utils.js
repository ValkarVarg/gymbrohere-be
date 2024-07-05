const format = require('pg-format');
const db = require('../connection');

exports.checkExists = (table, column, value) => {
	const queryStr = format('SELECT * FROM %I WHERE %I = $1;', table, column);
	return db.query(queryStr, [value]).then((dbOutput) => {
		if (dbOutput.rows.length === 0) {
			return Promise.reject({ status: 404, msg: 'Resource Not Found' });
		}
	});
};

exports.validateUser = (user) => {
	const { birthdate, height, weight, goal, avatar_body, avatar_hair_shape, avatar_hair_colour, avatar_skin_colour, avatar_shirt_colour } = user;
	if (
		!birthdate ||
		typeof height !== 'number' ||
		height < 0 ||
		typeof weight !== 'number' ||
		weight < 0 ||
		!goal ||
		typeof avatar_body !== 'number' ||
		typeof avatar_hair_shape !== 'number' ||
		typeof avatar_hair_colour !== 'number' ||
		typeof avatar_skin_colour !== 'number' ||
		typeof avatar_shirt_colour !== 'number'
	) {
		throw { status: 400, msg: 'Bad Request' };
	}
};
