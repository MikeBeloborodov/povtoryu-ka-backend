import request from "supertest";
import app, { server } from "../src/index";

afterAll(async () => {
  server.close();
});

describe("true is true", () => {
  test("true test", () => {
    expect(true).toBe(true);
  });
});

describe("test app", () => {
  test("test one endpoint", async () => {
    const res = await request(app).get("/api/v1/test");
    expect(res.body).toEqual({ message: "Test" });
    expect(res.status).toEqual(200);
  });
});

describe("test registerTeacherEndpoint", () => {
  test("register teacher", async () => {
    const payload = {
      userName: "testTeacher",
      password: "testTeacher123",
      specialCode: "testCode",
    };
    const res = await request(app)
      .post("/api/v1/teacher/register")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(201);
  });
});
