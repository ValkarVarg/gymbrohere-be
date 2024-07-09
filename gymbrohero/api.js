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
// no avatar patching currently
export function patchUser(user_id, { birthdate, height, weight, goal }) {
  return gymBroHeroApi
    .patch(`/users/${user_id}`, { birthdate, height, weight, goal })
    .then(({ data }) => {
      return data.user;
    })
    .catch((err) => {
      console.log(err);
    });
}
// no avatar posting currently
export function postUser(user_id, { birthdate, height, weight, goal }) {
  return gymBroHeroApi
    .post(`/users/${user_id}`, { birthdate, height, weight, goal })
    .then(({ data }) => {
      return data.user;
    })
    .catch((err) => {
      console.log(err);
    });
}
