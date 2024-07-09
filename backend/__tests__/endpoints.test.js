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
          experience: 0,
          complete_workouts: 0,
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
        const planid = response.body.workout.workout_plan_id;
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

describe("/api/exercises", () => {
  test("GET:200 sends an object of all exercises to the user", () => {
    return request(app)
      .get("/api/exercises")
      .expect(200)
      .then(({ body }) => {
        body.exercises.forEach((exercise) => {
          expect(exercise).toMatchObject({
            exercise_name: expect.any(String),
            exercise_id: expect.any(Number),
          });
        });
      });
  });
});

describe("/api/users/:user_id", () => {
  test("PATCH:200 updates a user with info sent", () => {
    const body = {
      birthdate: "2000-01-01T00:00:00.000Z",
      height: 175,
      weight: 75,
      goal: "maintain health",
      avatar_body: 1,
      avatar_hair_shape: 2,
      avatar_hair_colour: 3,
      avatar_skin_colour: 2,
      avatar_shirt_colour: 3,
      experience: 100,
      complete_workouts: 10,
    };

    const userId = 1;
    return request(app)
      .patch(`/api/users/${userId}`)
      .send(body)
      .expect(200)
      .then(({ body }) => {
        expect(body.user).toMatchObject({
          birthdate: "2000-01-01T00:00:00.000Z",
          height: 175,
          weight: 75,
          goal: "maintain health",
          avatar_body: 1,
          avatar_hair_shape: 2,
          avatar_hair_colour: 3,
          avatar_skin_colour: 2,
          avatar_shirt_colour: 3,
          experience: 100,
          complete_workouts: 10,
        });
      });
  });
  test("PATCH:200 works when only some info sent", () => {
    const body = {
      experience: 100,
      complete_workouts: 10,
    };

    const userId = 1;
    return request(app)
      .patch(`/api/users/${userId}`)
      .send(body)
      .expect(200)
      .then(({ body }) => {
        expect(body.user).toMatchObject({
          birthdate: "1999-03-12T00:00:00.000Z",
          height: 180,
          weight: 120,
          goal: "get swole",
          avatar_body: 2,
          avatar_hair_shape: 1,
          avatar_hair_colour: 1,
          avatar_skin_colour: 1,
          avatar_shirt_colour: 1,
          experience: 100,
          complete_workouts: 10,
        });
      });
  });
  test("PATCH:404 not found if user does not exist", () => {
    const body = {
      experience: 100,
      complete_workouts: 10,
    };

    const userId = 99;
    return request(app)
      .patch(`/api/users/${userId}`)
      .send(body)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Resource Not Found");
      });
  });
  test("PATCH:400 bad request if wrong body entry used", () => {
    const body = {
      expesadasda: 100,
    };

    const userId = 1;
    return request(app)
      .patch(`/api/users/${userId}`)
      .send(body)
      .expect(500)
      .then(({ body }) => {
        expect(body.msg).toBe("Internal Server Error");
      });
  });
});

describe("/api/users", () => {
  test("DELETE:204 deletes a user", () => {
    return request(app)
      .delete("/api/users/1")
      .expect(204)
      .then(() => {
        return request(app)
          .get("/api/users/1")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Not Found");
          });
      });
  });
});

describe("/api/items", () => {
  test("GET:200 returns all available items", () => {
    return request(app)
      .get("/api/items")
      .expect(200)
      .then(({ body }) => {
        expect(body.items.length).toBe(2);
      });
  });
});

describe("/api/items/:user_id", () => {
  test("GET:200 returns all items associated with the user", () => {
    return request(app)
      .get("/api/items/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.items.length).toBe(1);
      });
  });
test("POST:201 adds an item to userItems", () => {
  const item = { item_id: 1, display_location: "A3" };
  return request(app)
    .post("/api/items/1")
    .send(item)
    .expect(201)
    .then(({ body }) => {
      expect(body.item).toMatchObject({
        users_item_row_id: 2,
        user_id: 1,
        item_id: 1,
        display_location: "A3",
      });
    });
})
test("PATCH:200 updates a user item with info sent", () => {
	const body = {
	  users_item_row_id: 1,
	  user_id: 1,
	  item_id: 2,
	  display_location: "B4",
	};
	return request(app)
	  .patch(`/api/items`)
	  .send(body)
	  .expect(200)
	  .then(({ body }) => {
		expect(body.item).toMatchObject({
		  users_item_row_id: 1,
		  user_id: 1,
		  item_id: 2,
		  display_location: "B4",
		});
	  });
  });
});

describe("/api/workoutplans/:workout_plan_id", () => {
	test("DELETE:204 deletes a workout plan", () => {
	  return request(app)
		.delete("/api/workoutplans/1")
		.expect(204)
		.then(() => {
		  return request(app)
			.get("/api/workouts/1")
			.expect(200)
			.then(({ body }) => {
				const workoutsWithDeletedPlan = body.workouts.filter(
					workout => workout.workout_plan_id === 1
				  );
				  expect(workoutsWithDeletedPlan.length).toBe(0);
			});
		});
	});
  });