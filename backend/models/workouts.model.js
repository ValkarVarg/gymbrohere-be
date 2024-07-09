const db = require('../connection.js');
const format = require('pg-format')

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

exports.insertIndividualWorkout = (workoutData, workoutid) => {
	const formattedData = format(
		'INSERT INTO individualworkout (workout_plan_id, order_id, exercise_id, set_id, reps, weight) VALUES %L RETURNING *;',
		workoutData.map((workout) => [workoutid, workout.order_id, workout.exercise_id, workout.set_id, workout.reps, workout.weight])
	);
	return db
		.query(formattedData)
		.then(({ rows }) => {
			return rows;
		})
		.catch((err) => {
			throw err;
		});
};

exports.insertWorkoutPlan = (workoutPlan) => {
	const { workout_plan_name, user_id } = workoutPlan;
	return db.query(`INSERT INTO workoutplans (workout_plan_name, user_id) VALUES ($1, $2) RETURNING *;`, [workout_plan_name, user_id]);
};

exports.fetchExercises = () => {
	return db
		.query(
			`SELECT * FROM exercises`
		)
		.then(({ rows }) => {
			return rows;
		});
};

exports.removeWorkout = (id) => {
	return db.query(`DELETE FROM workoutPlans WHERE workout_plan_id = $1`, [id]).then((response) => {
		if (response.length === 0) {
			return Promise.reject({ status: 404, msg: 'Not Found' });
		}
		return response;
	});
};