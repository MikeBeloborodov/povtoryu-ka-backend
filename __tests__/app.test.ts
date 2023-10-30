import request from "supertest";
import app, { server } from "../src/index";

// consts
const TEACHER_NAME = "testTeacher";
const TEACHER_PASSWORD = "testTeacher123";
const TEACHER_SPECIAL_CODE = "testCode";
const STUDENT_NICKNAME = "testStudent";
let STUDENT_CODE: string;
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
//
// teacher tests
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

describe("Teacher same data reg test:", () => {
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
    expect(res.status).toEqual(409);
  });
});

describe("Teacher login test wrong payload:", () => {
  sequentialTest("Login:", async () => {
    const payload = {
      userName: TEACHER_NAME + "test",
      password: TEACHER_PASSWORD + "test",
    };
    const res = await request(app)
      .post("/api/v1/teacher/login")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
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

describe("Teacher get student code:", () => {
  sequentialTest("Get code:", async () => {
    const payload = {
      studentName: STUDENT_NICKNAME,
    };
    const res = await request(app)
      .post("/api/v1/student/code/new")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    console.log(res.body);
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("code");
    STUDENT_CODE = res.body.code;
  });
});

describe("Teacher delete test wrong JWT:", () => {
  sequentialTest("Delete:", async () => {
    const res = await request(app)
      .delete("/api/v1/teacher/delete")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN + "test"} `);
    expect(res.status).toEqual(400);
  });
});

describe("Teacher delete test:", () => {
  test("Delete:", async () => {
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
