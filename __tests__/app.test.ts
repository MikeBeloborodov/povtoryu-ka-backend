import request from "supertest";
import app, { server } from "../src/index";

// consts
const TEACHER_NAME = "testTeacher";
const TEACHER_PASSWORD = "testTeacher123";
const TEACHER_SPECIAL_CODE = "testCode";
let TEACHER_TOKEN: string;
let HAS_TEST_FAILED = false;

// functions
const sequentialTest = (name: string, action: Function) => {
  test(name, async () => {
    if (HAS_TEST_FAILED) {
      console.warn(`[skipped]: ${name}`);
    } else {
      try {
        await action();
      } catch (error) {
        HAS_TEST_FAILED = true;
        throw error;
      }
    }
  });
};

// tests
describe("Teacher reg test:", () => {
  sequentialTest("Reg:", async () => {
    const payload = {
      userName: TEACHER_NAME,
      password: TEACHER_PASSWORD,
      specialCode: TEACHER_SPECIAL_CODE,
    };
    const res = await request(app)
      .post("/api/v1/teacher/register")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(201);
  });
});

describe("Teacher login test:", () => {
  sequentialTest("Login:", async () => {
    const payload = {
      userName: TEACHER_NAME,
      password: TEACHER_PASSWORD,
    };
    const res = await request(app)
      .post("/api/v1/teacher/login")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("token");
    TEACHER_TOKEN = res.body.token;
  });
});

describe("Teacher delete test:", () => {
  sequentialTest("Delete:", async () => {
    const res = await request(app)
      .delete("/api/v1/teacher/delete")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN} `);
    expect(res.status).toEqual(200);
  });
});

afterAll(async () => {
  server.close();
  console.log("closed server");
});
