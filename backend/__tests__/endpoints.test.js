const seed = require("../seed");
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
        expect(response.body.workouts).toEqual([
          { workout_plan_id: 1, workout_plan_name: "lifting", user_id: 1 },
          { workout_plan_id: 2, workout_plan_name: "big lifts", user_id: 1 },
        ]);
      });
  });
  test("GET:400 returns an error when a invalid userid is used", () => {
    return request(app)
      .get("/api/workouts/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("GET:404 returns an error when a non-existing but valid userid is used", () => {
    return request(app)
      .get("/api/workouts/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});

describe("/api/individualworkouts/:workout_id", () => {
  test("GET: 200 responds with an individual workout array of set objects", () => {
    return request(app)
      .get("/api/individualworkouts/1")
      .expect(200)
      .then((response) => {
        expect(response.body.workout).toEqual([
          {
            workout_plan_id: 1,
            individual_workout_row_id: 1,
            order_id: 1,
            exercise_id: 1,
            set_id: 1,
            reps: 10,
            weight: 100,
          },
          {
            workout_plan_id: 1,
            individual_workout_row_id: 2,
            order_id: 1,
            exercise_id: 1,
            set_id: 2,
            reps: 10,
            weight: 100,
          },
          {
            workout_plan_id: 1,
            individual_workout_row_id: 3,
            order_id: 2,
            exercise_id: 2,
            set_id: 1,
            reps: 10,
            weight: 100,
          },
        ]);
      });
  });
  test("GET:400 returns an error when a invalid workout id is used", () => {
    return request(app)
      .get("/api/individualworkouts/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("GET:404 returns an error when a non-existing but valid workout id is used", () => {
    return request(app)
      .get("/api/individualworkouts/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});

describe("/api/userlogin", () => {
  test("POST: 201 post new user account", () => {
    const userLogin = {
      username: "santa",
      password: "hohoho",
      email: "santa@northpole.com",
    };
    return request(app)
      .post("/api/userlogin")
      .send(userLogin)
      .expect(201)
      .then(({ body }) => {
        expect(body.userlogin).toMatchObject({
          username: "santa",
          password: "hohoho",
          email: "santa@northpole.com",
          user_id: 2,
        });
      });
  });
  test("POST: 400 returns error if user login data is bad", () => {
    const userLogin = {
      username: "santa",
      password: "hohoho",
    };
    return request(app)
      .post("/api/userlogin")
      .send(userLogin)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("POST: 400 returns error if username is already taken", () => {
    const userLogin1 = {
      username: "santa",
      password: "hohoho",
      email: "santa@northpole.com",
    };
    const userLogin2 = {
      username: "santa",
      password: "fakehohoho",
      email: "fakesanta@northpole.com",
    };
    return request(app)
      .post("/api/userlogin")
      .send(userLogin1)
      .expect(201)
      .then(() => {
        return request(app)
          .post("/api/userlogin")
          .send(userLogin2)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad Request");
          });
      });
  });
  test("POST: 400 returns error if email is already taken", () => {
    const userLogin1 = {
      username: "santa",
      password: "hohoho",
      email: "santa@northpole.com",
    };
    const userLogin2 = {
      username: "fakesanta",
      password: "fakehohoho",
      email: "santa@northpole.com",
    };
    return request(app)
      .post("/api/userlogin")
      .send(userLogin1)
      .expect(201)
      .then(() => {
        return request(app)
          .post("/api/userlogin")
          .send(userLogin2)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad Request");
          });
      });
  });
  test("GET: 200 get user login by username", () => {
    const username = "Jim";
    return request(app)
      .get(`/api/userlogin/${username}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.userLogin).toMatchObject({
          username: "Jim",
          password: "password",
          email: "jim@yahoo.com",
          user_id: 1,
        });
      });
  });
  test("GET: 404 returns error if user not found", () => {
    const username = "nonexistentuser";
    return request(app)
      .get(`/api/userlogin/${username}`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});

describe("/api/users", () => {
  test("POST: 201 posts new user object", () => {
    const userLogin = {
      username: "santa",
      password: "hohoho",
      email: "santa@northpole.com",
    };
    const user = {
      birthdate: "2024-07-05",
      height: 190,
      weight: 100,
      goal: "get huge",
      avatar_body: 1,
      avatar_hair_shape: 1,
      avatar_hair_colour: 1,
      avatar_skin_colour: 1,
      avatar_shirt_colour: 1,
    };
    return request(app)
      .post("/api/userlogin")
      .send(userLogin)
      .then(() => {
        return request(app)
          .post("/api/users/2")
          .send(user)
          .expect(201)
          .then(({ body }) => {
            expect(body.user).toMatchObject({
              birthdate: "2024-07-04T23:00:00.000Z",
              user_id: 2,
              height: 190,
              weight: 100,
              goal: "get huge",
              avatar_body: 1,
              avatar_hair_shape: 1,
              avatar_hair_colour: 1,
              avatar_skin_colour: 1,
              avatar_shirt_colour: 1,
            });
          });
      });
  });
  test("POST: 400 returns error if user data is bad", () => {
    const userLogin = {
      username: "santa",
      password: "hohoho",
      email: "santa@northpole.com",
    };
    const user = {
      birthdate: "",
      height: "one hundred and ninety",
      weight: 100,
      goal: "",
      avatar_body: 1,
      avatar_hair_shape: 1,
      avatar_hair_colour: 1,
      avatar_skin_colour: 1,
      avatar_shirt_colour: 1,
    };
    return request(app)
      .post("/api/userlogin")
      .send(userLogin)
      .then(() => {
        return request(app)
          .post("/api/users/2")
          .send(user)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad Request");
          });
      });
  });
  test("POST: 404 returns not found if user_id does not exist in userslogin", () => {
    const userLogin = {
      username: "santa",
      password: "hohoho",
      email: "santa@northpole.com",
    };
    const user = {
      birthdate: "2024-07-05",
      height: 190,
      weight: 100,
      goal: "get huge",
      avatar_body: 1,
      avatar_hair_shape: 1,
      avatar_hair_colour: 1,
      avatar_skin_colour: 1,
      avatar_shirt_colour: 1,
    };
    return request(app)
      .post("/api/userlogin")
      .send(userLogin)
      .then(() => {
        return request(app)
          .post("/api/users/999")
          .send(user)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Resource Not Found");
          });
      });
  });
});

describe("/api/workouts/:workout_plan_id", () => {
  test("POST: 201 posts new workout plan", () => {
    const workoutPlan = {
      workout_plan_name: "big",
      user_id: 1,
    };
    return request(app)
      .post("/api/workoutplans")
      .send(workoutPlan)
      .expect(201)
      .then((response) => {
        expect(response.body.workout).toMatchObject({
          workout_plan_id: 3,
          workout_plan_name: "big",
          user_id: 1,
        });
      });
  });
  test("POST: throws an error if no user exists with id", () => {
    const workoutPlan = {
      workout_plan_name: "big",
      user_id: 22,
    };
    return request(app)
      .post("/api/workoutplans")
      .send(workoutPlan)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Resource Not Found");
      });
  });
  test("POST: throws an error if bad data provided", () => {
    const workoutPlan = {
      user_id: 1,
    };
    return request(app)
      .post("/api/workoutplans")
      .send(workoutPlan)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

describe("/api/workouts", () => {
  test("POST: 201 posts new individual workout", () => {
    const workoutPlan = {
      workout_plan_name: "big",
      user_id: 1,
    };
    const newWorkout = [
      {
        order_id: 1,
        exercise_id: 1,
        set_id: 1,
        reps: 10,
        weight: 100,
      },
      {
        order_id: 1,
        exercise_id: 1,
        set_id: 2,
        reps: 10,
        weight: 100,
      },
    ];
    return request(app)
      .post("/api/workoutplans")
      .send(workoutPlan)
      .expect(201)
      .then((response) => {
        const planid = response.body.workout.workout_plan_id;
        return request(app)
          .post(`/api/workouts/${planid}`)
          .send(newWorkout)
          .expect(201)
          .then(({ body }) => {
            expect(body).toEqual(expect.any(Array));
            expect(body).toHaveLength(2);
            body.forEach((workout) => {
              expect(workout).toMatchObject({
                workout_plan_id: expect.any(Number),
                order_id: expect.any(Number),
                exercise_id: expect.any(Number),
                set_id: expect.any(Number),
                reps: expect.any(Number),
                weight: expect.any(Number),
              });
            });
          });
      });
  });
  test("POST: gives an error when data not correct", () => {
    const workoutPlan = {
      workout_plan_name: "big",
      user_id: 1,
    };
    const newWorkout = [
      {
        order_id: 1,
      },
      {
        reps: 10,
        weight: 100,
      },
    ];
    return request(app)
      .post("/api/workoutplans")
      .send(workoutPlan)
      .expect(201)
      .then((response) => {
        const planid = response.body.workout.workout_plan_id
		return request(app)
          .post(`/api/workouts/${planid}`)
          .send(newWorkout)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad Request");
          });
      });
  });
});
