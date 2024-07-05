const { fetchWorkouts, fetchIndividualWorkout } = require('../models/workouts.model');

exports.getWorkouts = (req, res, next) => {
	const id = req.params.userid;
	fetchWorkouts(id)
		.then((workouts) => {
			res.status(200).send({ workouts: workouts });
		})
		.catch(next);
};

exports.getIndividualWorkout = (req, res, next) => {
	const id = req.params.workout_id;
	fetchIndividualWorkout(id)
		.then((workout) => {
			res.status(200).send({ workout: workout });
		})
		.catch(next);
};
