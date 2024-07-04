const { seed } = require("../seed");
const testData = require("../data/test-data");
const db = require("../connection.js");
const request = require("supertest");
const app = require("../endpoints");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api/users/:userid", () => {
  test("GET:200 sends a user object to the client", () => {
    return request(app)
      .get("/api/users/1")
      .expect(200)
      .then((response) => {
        expect(response.body.user).toEqual({
          user_id: 1,
          birthdate: "1999-03-12T00:00:00.000Z",
          height: 180,
          weight: 120,
          goal: "get swole",
          avatar_body: 2,
          avatar_hair_shape: 1,
          avatar_hair_colour: 1,
          avatar_skin_colour: 1,
          avatar_shirt_colour: 1,
          username: "Jim",
        });
      });
  });
  test("GET:400 returns an error when a invalid userid is used", () => {
    return request(app)
      .get("/api/users/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("GET:404 returns an error when a non-existing but valid userid is used", () => {
    return request(app)
      .get("/api/users/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});


describe("/api/workouts/:userid", () => {
  test("GET:200 sends an object of workouts to the client", () => {
    return request(app)
      .get("/api/workouts/1")
      .expect(200)
      .then((response) => {
        console.log(response.body.workouts)
        expect(response.body.user).toEqual({
          user_id: 1,
          birthdate: "1999-03-12T00:00:00.000Z",
          height: 180,
          weight: 120,
          goal: "get swole",
          avatar_body: 2,
          avatar_hair_shape: 1,
          avatar_hair_colour: 1,
          avatar_skin_colour: 1,
          avatar_shirt_colour: 1,
          username: "Jim",
        });
      });
  });
})