import axios from "axios";

const gymBroHeroApi = axios.create({
  baseURL: "https://gymbrohero.onrender.com/api",
});

export function fetchUsers(user_id) {
  return gymBroHeroApi
    .get(`/users/${user_id}`)
    .then(({ data }) => {
      return data.user;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function patchUser(user_id, payload) {
  return gymBroHeroApi
    .patch(`/users/${user_id}`, payload)
    .then(({ data }) => {
      return data.user;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function postUser(user_id, payload) {
  return gymBroHeroApi
    .post(`/users/${user_id}`, payload)
    .then(({ data }) => {
      return data.user;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function patchCompletedWorkout(user_id, experience) {
    return fetchUsers(user_id)
    .then((response) => {
      if (!response) {
        throw new Error('User not found');
      }
      const complete_workouts = response.complete_workouts + 1; 
      return complete_workouts;
    })
    .then(complete_workouts => {
      return gymBroHeroApi
        .patch(`/users/${user_id}`, { experience, complete_workouts }) 
        .then(({ data }) => {
          return data.user; 
        })
        .catch(err => {
          console.error('Error patching user data:', err); 
          throw err; 
        });
    })
    .catch(err => {
      console.error('Error fetching user data:', err); 
      throw err;
    });
}

export function fetchItems() {
  return gymBroHeroApi
    .get(`/items`)
    .then(({ data }) => {
      return data.items;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function fetchWorkouts(user_id) {
	return gymBroHeroApi
		.get(`/workouts/${user_id}`)
		.then(({ data }) => {
			return data.workouts;
		})
		.catch((err) => {
			console.log(err);
		});
 }
 
 
 export function fetchIndividualWorkouts(workout_plan_id) {
	return gymBroHeroApi
		.get(`/individualworkouts/${workout_plan_id}`)
		.then(({ data }) => {
			return data.workout;
		})
		.catch((err) => {
			console.log(err);
		});
 }
 
 
 export function fetchExercises() {
	return gymBroHeroApi
		.get(`/exercises`)
		.then(({ data }) => {
			return data.exercises;
		})
		.catch((err) => {
			console.log(err);
		});
 }
 