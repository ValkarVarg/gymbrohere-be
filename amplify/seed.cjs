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
    .then(()=> {console.log("end")});

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
};

module.exports = { seed };
