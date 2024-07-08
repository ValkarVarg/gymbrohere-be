const { fetchWorkouts, fetchIndividualWorkout, insertIndividualWorkout, insertWorkoutPlan } = require('../models/workouts.model');

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

exports.postNewWorkout = (req, res, next) => {
	const workoutData = req.body;
	insertIndividualWorkout(workoutData)
		.then((newWorkouts) => {
			res.status(201).send(newWorkouts);
		})
		.catch((err) => {
			console.error('Error inserting new workout:', err);
			next(err);
		});
};

exports.postNewWorkoutPlan = (req, res, next) => {
	const workoutPlan = req.body;
	insertWorkoutPlan(workoutPlan)
		.then((workout) => {
			res.status(201).send({ workout: workout.rows[0] });
		})
		.catch(next);
};
