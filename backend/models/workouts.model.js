const db = require('../connection.js');

exports.fetchWorkouts = (id) => {
	return db
		.query(
			`SELECT * FROM workoutplans
                    WHERE user_id = $1`,
			[id]
		)
		.then(({ rows }) => {
			if (rows.length === 0) {
				return Promise.reject({ status: 404, msg: 'Not Found' });
			}
			return rows;
		});
};

exports.fetchIndividualWorkout = (id) => {
	return db.query(`SELECT * FROM  individualworkout WHERE workout_plan_id = $1`, [id]).then(({ rows }) => {
		if (rows.length === 0) {
			return Promise.reject({ status: 404, msg: 'Not Found' });
		}
		return rows;
	});
};
