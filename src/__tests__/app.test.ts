import request from "supertest";
import app, { server } from "../index";

// consts
const TEACHER_NAME = "testTeacher";
const TEACHER_PASSWORD = "testTeacher123";
const TEACHER_SPECIAL_CODE = "testCode";
const STUDENT_NICKNAME = "testStudent";
const STUDENT_NAME = "testStudent";
const STUDENT_PASSWORD = "testStudent123";
let STUDENT_CODE: string;
let TEACHER_TOKEN: string;
let STUDENT_TOKEN: string;
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
describe("Teacher reg wrong body:", () => {
  test("Reg:", async () => {
    const payload = {
      userName: TEACHER_NAME,
      specialCode: TEACHER_SPECIAL_CODE,
    };
    const res = await request(app)
      .post("/api/v1/teacher/register")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
  });
});

describe("Teacher reg no body:", () => {
  test("Reg:", async () => {
    const res = await request(app)
      .post("/api/v1/teacher/register")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
  });
});

describe("Teacher reg wrong code:", () => {
  test("Reg:", async () => {
    const payload = {
      userName: TEACHER_NAME,
      password: TEACHER_PASSWORD,
      specialCode: TEACHER_SPECIAL_CODE + "123",
    };
    const res = await request(app)
      .post("/api/v1/teacher/register")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
  });
});

describe("Teacher reg:", () => {
  test("Reg:", async () => {
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
  test("Reg:", async () => {
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

describe("Teacher login test no payload:", () => {
  test("Login:", async () => {
    const res = await request(app)
      .post("/api/v1/teacher/login")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
  });
});

describe("Teacher login test wrong payload:", () => {
  test("Login:", async () => {
    const payload = {
      userName: TEACHER_NAME,
    };
    const res = await request(app)
      .post("/api/v1/teacher/login")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
  });
});

describe("Teacher login wrong pass:", () => {
  test("Login:", async () => {
    const payload = {
      userName: TEACHER_NAME,
      password: TEACHER_PASSWORD + "123",
    };
    const res = await request(app)
      .post("/api/v1/teacher/login")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
  });
});

describe("Teacher login wrong login:", () => {
  test("Login:", async () => {
    const payload = {
      userName: TEACHER_NAME + "123",
      password: TEACHER_PASSWORD,
    };
    const res = await request(app)
      .post("/api/v1/teacher/login")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
  });
});

describe("Teacher login:", () => {
  test("Login:", async () => {
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

describe("Teacher validate token wrong token:", () => {
  test("Validate:", async () => {
    const res = await request(app)
      .get("/api/v1/teacher/token")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN} 123`);
    expect(res.status).toEqual(400);
  });
});

describe("Teacher validate token no token:", () => {
  test("Validate:", async () => {
    const res = await request(app)
      .get("/api/v1/teacher/token")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
  });
});

describe("Teacher validate token:", () => {
  test("Validate:", async () => {
    const res = await request(app)
      .get("/api/v1/teacher/token")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    expect(res.status).toEqual(200);
  });
});

describe("Teacher register student wrong body:", () => {
  test("Register code:", async () => {
    const res = await request(app)
      .post("/api/v1/student/code/new")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    expect(res.status).toEqual(400);
  });
});

describe("Teacher register student code wrong jwt:", () => {
  test("Register code:", async () => {
    const payload = {
      studentName: STUDENT_NICKNAME,
    };
    const res = await request(app)
      .post("/api/v1/student/code/new")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN} 123`);
    expect(res.status).toEqual(400);
  });
});

describe("Teacher register student code no jwt:", () => {
  test("Register code:", async () => {
    const payload = {
      studentName: STUDENT_NICKNAME,
    };
    const res = await request(app)
      .post("/api/v1/student/code/new")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
  });
});

describe("Teacher register student code:", () => {
  test("Register code:", async () => {
    const payload = {
      studentName: STUDENT_NICKNAME,
    };
    const res = await request(app)
      .post("/api/v1/student/code/new")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("code");
    STUDENT_CODE = res.body.code;
  });
});

describe("Student reg wrong body:", () => {
  test("Reg:", async () => {
    const payload = {
      userName: STUDENT_NAME,
      password: STUDENT_PASSWORD,
    };
    const res = await request(app)
      .post("/api/v1/student/register")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
  });
});

describe("Student reg wrong special code:", () => {
  test("Reg:", async () => {
    const payload = {
      userName: STUDENT_NAME,
      password: STUDENT_PASSWORD,
      specialCode: STUDENT_CODE + "123",
    };
    const res = await request(app)
      .post("/api/v1/student/register")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
  });
});

describe("Student reg:", () => {
  test("Reg:", async () => {
    const payload = {
      userName: STUDENT_NAME,
      password: STUDENT_PASSWORD,
      specialCode: STUDENT_CODE,
    };
    const res = await request(app)
      .post("/api/v1/student/register")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(201);
  });
});

describe("Student reg same student data:", () => {
  test("Reg:", async () => {
    const payload = {
      userName: STUDENT_NAME,
      password: STUDENT_PASSWORD,
      specialCode: STUDENT_CODE,
    };
    const res = await request(app)
      .post("/api/v1/student/register")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(409);
  });
});

describe("Student wrong body:", () => {
  test("Login:", async () => {
    const payload = {
      userName: STUDENT_NAME,
    };
    const res = await request(app)
      .post("/api/v1/student/login")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
  });
});

describe("Student login wrong username:", () => {
  test("Login:", async () => {
    const payload = {
      userName: STUDENT_NAME + "123",
      password: STUDENT_PASSWORD,
    };
    const res = await request(app)
      .post("/api/v1/student/login")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
  });
});

describe("Student login wrong password:", () => {
  test("Login:", async () => {
    const payload = {
      userName: STUDENT_NAME,
      password: STUDENT_PASSWORD + "123",
    };
    const res = await request(app)
      .post("/api/v1/student/login")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
  });
});

describe("Student login:", () => {
  test("Login:", async () => {
    const payload = {
      userName: STUDENT_NAME,
      password: STUDENT_PASSWORD,
    };
    const res = await request(app)
      .post("/api/v1/student/login")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("token");
    STUDENT_TOKEN = res.body.token;
  });
});

describe("Student validate token no token:", () => {
  test("Validate:", async () => {
    const res = await request(app)
      .get("/api/v1/student/token")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
  });
});

describe("Student validate token wrong token:", () => {
  test("Validate:", async () => {
    const res = await request(app)
      .get("/api/v1/student/token")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${STUDENT_TOKEN} 123`);
    expect(res.status).toEqual(400);
  });
});

describe("Student validate token:", () => {
  test("Validate:", async () => {
    const res = await request(app)
      .get("/api/v1/student/token")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${STUDENT_TOKEN}`);
    expect(res.status).toEqual(200);
  });
});

describe("Student delete wrong body:", () => {
  test("Delete:", async () => {
    const payload = {
      student: STUDENT_NICKNAME,
    };
    const res = await request(app)
      .delete("/api/v1/student/delete")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    expect(res.status).toEqual(400);
  });
});

describe("Student delete no body:", () => {
  test("Delete:", async () => {
    const res = await request(app)
      .delete("/api/v1/student/delete")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    expect(res.status).toEqual(400);
  });
});

describe("Student delete no JWT:", () => {
  test("Delete:", async () => {
    const payload = {
      studentName: STUDENT_NICKNAME,
    };
    const res = await request(app)
      .delete("/api/v1/student/delete")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
  });
});

describe("Student delete wrong JWT:", () => {
  test("Delete:", async () => {
    const payload = {
      studentName: STUDENT_NICKNAME,
    };
    const res = await request(app)
      .delete("/api/v1/student/delete")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN} test`);
    expect(res.status).toEqual(400);
  });
});

describe("Student delete no such student:", () => {
  test("Delete:", async () => {
    const payload = {
      studentName: STUDENT_NICKNAME + "123",
    };
    const res = await request(app)
      .delete("/api/v1/student/delete")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    expect(res.status).toEqual(400);
  });
});

describe("Student delete as student:", () => {
  test("Delete:", async () => {
    const payload = {
      studentName: STUDENT_NICKNAME,
    };
    const res = await request(app)
      .delete("/api/v1/student/delete")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${STUDENT_TOKEN}`);
    expect(res.status).toEqual(403);
  });
});

describe("Student delete:", () => {
  test("Delete:", async () => {
    const payload = {
      studentName: STUDENT_NICKNAME,
    };
    const res = await request(app)
      .delete("/api/v1/student/delete")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    expect(res.status).toEqual(200);
  });
});

describe("Student validate token no student:", () => {
  test("Validate:", async () => {
    const res = await request(app)
      .get("/api/v1/student/token")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${STUDENT_TOKEN}`);
    expect(res.status).toEqual(400);
  });
});

describe("Teacher delete student code wrong JWT:", () => {
  test("Delete code:", async () => {
    const payload = {
      studentName: STUDENT_NICKNAME,
    };
    const res = await request(app)
      .delete("/api/v1/student/code/delete")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN} test`);
    expect(res.status).toEqual(400);
  });
});

describe("Teacher delete student code no JWT:", () => {
  test("Delete code:", async () => {
    const payload = {
      studentName: STUDENT_NICKNAME,
    };
    const res = await request(app)
      .delete("/api/v1/student/code/delete")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
  });
});

describe("Teacher delete student code wrong student:", () => {
  test("Delete code:", async () => {
    const payload = {
      studentName: STUDENT_NICKNAME + "test",
    };
    const res = await request(app)
      .delete("/api/v1/student/code/delete")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    expect(res.status).toEqual(400);
  });
});

describe("Teacher delete student code wrong no student:", () => {
  test("Delete code:", async () => {
    const payload = {};
    const res = await request(app)
      .delete("/api/v1/student/code/delete")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    expect(res.status).toEqual(400);
  });
});

describe("Teacher delete student code:", () => {
  test("Delete code:", async () => {
    const payload = {
      studentName: STUDENT_NICKNAME,
    };
    const res = await request(app)
      .delete("/api/v1/student/code/delete")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    expect(res.status).toEqual(200);
  });
});

// delete teacher
describe("Teacher delete test wrong JWT:", () => {
  test("Delete:", async () => {
    const res = await request(app)
      .delete("/api/v1/teacher/delete")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN + "test"} `);
    expect(res.status).toEqual(400);
  });
});

describe("Teacher delete no JWT:", () => {
  test("Delete:", async () => {
    const res = await request(app)
      .delete("/api/v1/teacher/delete")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
  });
});

describe("Teacher delete:", () => {
  test("Delete:", async () => {
    const res = await request(app)
      .delete("/api/v1/teacher/delete")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN} `);
    expect(res.status).toEqual(200);
  });
});

describe("Teacher delete again:", () => {
  test("Delete:", async () => {
    const res = await request(app)
      .delete("/api/v1/teacher/delete")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN} `);
    expect(res.status).toEqual(400);
  });
});

describe("Teacher validate token no teacher:", () => {
  test("Validate:", async () => {
    const res = await request(app)
      .get("/api/v1/teacher/token")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    expect(res.status).toEqual(400);
  });
});

afterAll(async () => {
  server.close();
});
