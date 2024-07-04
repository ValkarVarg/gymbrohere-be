const db = require("../connection.js");

exports.fetchWorkouts = (id) => {
    return db.query(`SELECT * FROM workouts
                    JOIN usersLogin
                    ON users.user_id = usersLogin.user_id
                    WHERE users.user_id = $1`,[id])
    .then (({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Not Found" });
          }
        return rows})
    }