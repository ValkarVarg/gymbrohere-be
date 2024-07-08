const db = require('./connection.js');
const format = require('pg-format');

const seed = ({ usersData, usersLoginData, exerciseData, workoutPlansData, individualWorkoutData }) => {
	return db
		.query(`DROP TABLE IF EXISTS usersItems;`)
		.then(() => {
			return db.query(`DROP TABLE IF EXISTS availableItems;`);
		})
		.then(() => {
			return db.query(`DROP TABLE IF EXISTS individualWorkout;`);
		})
		.then(() => {
			return db.query(`DROP TABLE IF EXISTS exercises;`);
		})
		.then(() => {
			return db.query(`DROP TABLE IF EXISTS workoutPlans;`);
		})
		.then(() => {
			return db.query(`DROP TABLE IF EXISTS users;`);
		})
		.then(() => {
			return db.query(`DROP TABLE IF EXISTS usersLogin;`);
		})
		.then(() => {
			return createUsersLogin();
		})
		.then(() => {
			return createUsers();
		})
		.then(() => {
			return createWorkoutPlans();
		})
		.then(() => {
			return createExercises();
		})
		.then(() => {
			return createIndividualWorkout();
		})
		.then(() => {
			return createAvailableItems();
		})
		.then(() => {
			return createUserItems();
		})
		.then(() => {
			return populateUsersLogin(usersLoginData);
		})
		.then(() => {
			return populateUsers(usersData);
		})
		.then(() => {
			return populateExercises(exerciseData);
		})
		.then(() => {
			return populateWorkoutPlans(workoutPlansData);
		})
		.then(() => {
			return populateIndividualWorkouts(individualWorkoutData);
		});

	function createUsersLogin() {
		return db.query(`CREATE TABLE usersLogin 
  (user_id SERIAL PRIMARY KEY, 
  username VARCHAR(100) NOT NULL UNIQUE, 
  password VARCHAR(50) NOT NULL, 
  email VARCHAR(100) NOT NULL UNIQUE);`);
	}

	function createUsers() {
		return db.query(`CREATE TABLE users
  (user_id INT REFERENCES usersLogin(user_id),
  birthdate DATE NOT NULL,
  height INT NOT NULL,
  weight INT NOT NULL,
  goal VARCHAR(100) NOT NULL,
  avatar_body INT NOT NULL,
  avatar_hair_shape INT NOT NULL,
  avatar_hair_colour INT NOT NULL,
  avatar_skin_colour INT NOT NULL,
  avatar_shirt_colour INT NOT NULL
);`);
	}
	function createWorkoutPlans() {
		return db.query(`CREATE TABLE workoutPlans
    (workout_plan_id SERIAL PRIMARY KEY, 
    workout_plan_name VARCHAR(50) NOT NULL, 
    user_id INT REFERENCES usersLogin(user_id)
    )`);
	}
	function createExercises() {
		return db.query(`CREATE TABLE exercises
    (exercise_id SERIAL PRIMARY KEY, 
    exercise_name VARCHAR(50) NOT NULL, 
    exercise_instructions VARCHAR(200))`);
	}
	function createIndividualWorkout() {
		return db.query(`CREATE TABLE individualWorkout 
    (individual_workout_row_id SERIAL PRIMARY KEY, 
    workout_plan_id INT REFERENCES workoutPlans(workout_plan_id), 
    order_id INT NOT NULL, 
    exercise_id INT REFERENCES exercises(exercise_id), 
    set_id INT NOT NULL, 
    reps INT NOT NULL, 
    weight INT 
    )`);
	}
	function createAvailableItems() {
		return db.query(`CREATE TABLE availableItems 
    (item_id SERIAL PRIMARY KEY, 
    item_name VARCHAR(50),
    item_img VARCHAR(100), 
    level_available INT NOT NULL)`);
	}
	function createUserItems() {
		return db.query(`CREATE TABLE usersItems
    (users_item_row_id SERIAL PRIMARY KEY, 
     user_id INT REFERENCES usersLogin(user_id), 
     item_id INT REFERENCES availableItems (item_id), 
     display_location VARCHAR(5))`);
	}
};

function populateUsersLogin(usersLogin) {
	const insertUserLoginData = format(
		`INSERT INTO usersLogin 
					(username, password, email)
					VALUES %L
					RETURNING *;`,
		formatUsersLogin(usersLogin)
	);
	return db.query(insertUserLoginData);
}

function formatUsersLogin(usersLogin) {
	const formattedUserLoginData = usersLogin.map((userLogin) => {
		return [userLogin.username, userLogin.password, userLogin.email];
	});
	return formattedUserLoginData;
}

function populateUsers(users) {
	const insertUserData = format(
		`INSERT INTO users 
					(user_id, birthdate, height, weight, goal, avatar_body, avatar_hair_shape, avatar_hair_colour, avatar_skin_colour, avatar_shirt_colour)
					VALUES %L
					RETURNING *;`,
		formatUsers(users)
	);
	return db.query(insertUserData);
}

function formatUsers(users) {
	const formattedUserData = users.map((user) => {
		return [user.user_id, user.birthdate, user.height, user.weight, user.goal, user.avatar_body, user.avatar_hair_shape, user.avatar_hair_colour, user.avatar_skin_colour, user.avatar_shirt_colour];
	});
	return formattedUserData;
}

function populateExercises(exercises) {
	const insertExerciseData = format(
		`INSERT INTO exercises 
					(exercise_name, exercise_instructions)
					VALUES %L
					RETURNING *;`,
		formatExercises(exercises)
	);
	return db.query(insertExerciseData);
}

function formatExercises(exercises) {
	const formattedExerciseData = exercises.map((exercise) => {
		return [exercise.exercise_name, exercise.exercise_instructions];
	});
	return formattedExerciseData;
}

function populateWorkoutPlans(workoutPlans) {
	const insertWorkoutPlanData = format(
		`INSERT INTO workoutPlans 
					(workout_plan_name, user_id)
					VALUES %L
					RETURNING *;`,
		formatWorkoutPlans(workoutPlans)
	);
	return db.query(insertWorkoutPlanData);
}

function formatWorkoutPlans(workoutPlans) {
	const formattedWorkoutPlansData = workoutPlans.map((workoutPlan) => {
		return [workoutPlan.workout_plan_name, workoutPlan.user_id];
	});
	return formattedWorkoutPlansData;
}

function populateIndividualWorkouts(workouts) {
	const insertWorkoutData = format(
		`INSERT INTO individualworkout
					(workout_plan_id, order_id, exercise_id, set_id, reps, weight)
					VALUES %L
					RETURNING *;`,
		formatWorkout(workouts)
	);
	return db.query(insertWorkoutData);
}

function formatWorkout(workouts) {
	const formattedWorkoutData = workouts.map((workout) => {
		return [workout.workout_plan_id, workout.order_id, workout.exercise_id, workout.set_id, workout.reps, workout.weight];
	});
	return formattedWorkoutData;
}

module.exports = seed;
