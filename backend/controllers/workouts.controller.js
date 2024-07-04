const { fetchWorkouts } = require("../models/workouts.model");

exports.getWorkouts = (req, res, next) => {
    const id = req.params.userid
    fetchWorkouts(id)
    .then((workouts) => {
      res.status(200).send({"workouts": workouts});
    })
    .catch(next);
};