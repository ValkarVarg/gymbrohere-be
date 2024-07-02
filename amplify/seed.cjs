const db = require("./connection.cjs");
const format = require("pg-format");

const seed = () => {
  return db
    .query(`DROP TABLE IF EXISTS users;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS usersLogin;`);
    })
    .then(() => {
      return createUsersLogin();
    })
    .then(() => {
      return createUsers();
    })
    .then(()=> 
      {return createWorkoutPlans ()}
    )
    .then(()=> 
      {return createExercises()}
    )
    .then(()=> 
      {return createIndividualWorkout()}
    );

  function createUsersLogin() {
    return db.query(`CREATE TABLE usersLogin 
  (user_id SERIAL PRIMARY KEY, 
  username VARCHAR(100) NOT NULL, 
  password VARCHAR(50) NOT NULL, 
  email VARCHAR(100) NOT NULL);`);
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
    )`)
 }
function createExercises() {
  return db.query(`CREATE TABLE exercises
    (exercise_id SERIAL PRIMARY KEY, 
    exercise_name VARCHAR(50) NOT NULL, 
    exercise_instructions VARCHAR(200))`)
}
function createIndividualWorkout(){
  return db.query(`CREATE TABLE individualWorkout 
    (individual_workout_row_id SERIAL PRIMARY KEY, 
    workout_plan_id INT REFERENCES workoutPlans(workout_plan_id), 
    order_id INT NOT NULL, 
    exercise_id INT REFERENCES exercises(exercise_id), 
    set_id INT NOT NULL, 
    reps INT NOT NULL, 
    weight INT 
    )`)
}

};

module.exports = { seed };
