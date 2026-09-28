const request = require("supertest");
const app = require("../server");

describe("POST /api/subscribe", () => {
  test("returns 400 when email is missing", async () => {
    const response = await request(app)
      .post("/api/subscribe")
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Email is required");
  });

  test("returns 400 for an invalid email", async () => {
    const response = await request(app)
      .post("/api/subscribe")
      .send({ email: "invalid-email" });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      "Please enter a valid email address"
    );
  });

  test("returns 201 for a valid email", async () => {
    const email = `test-${Date.now()}@example.com`;

    const response = await request(app)
      .post("/api/subscribe")
      .send({ email });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Successfully subscribed!");
  });
});
