import request from "supertest";
import app, { server } from "../index";
import sinon from "sinon";
import { WordCard } from "../db/ormModels/WordCard";
import { Teacher } from "../db/ormModels/Teacher";
import { Student } from "../db/ormModels/Student";
import { StudentCode } from "../db/ormModels/StudentCode";
import { TeacherCode } from "../db/ormModels/TeacherCode";
import bcrypt from "bcrypt";

// consts
const TEACHER_NAME = "testTeacher";
const TEACHER_PASSWORD = "testTeacher123";
const TEACHER_SPECIAL_CODE = "testCode";

const STUDENT_NICKNAME = "testStudent";
const STUDENT_NAME = "testStudent";
const STUDENT_PASSWORD = "testStudent123";

const STUDENT_NICKNAME2 = "testStudent2";
const STUDENT_NAME2 = "testStudent2";
const STUDENT_PASSWORD2 = "testStudent222";

let STUDENT_CODE: string;
let STUDENT_CODE2: string;
let TEACHER_TOKEN: string;
let STUDENT_TOKEN: string;
let HAS_TEST_FAILED = false;

const wordCard = {
  partOfSpeech: "noun",
  word: "apple",
  definition: "A tasty fruit.",
  translations: ["яблоко"],
  sentences: ["I like apples."],
  images: [
    "https://tajex.nl/wp-content/uploads/2023/04/istockphoto-184276818-612x612-1.jpg",
  ],
  teacherId: 0,
  studentId: 0,
};

const wordCard2 = {
  partOfSpeech: "verb",
  word: "work",
  definition: "Doing things for money.",
  translations: ["работать"],
  sentences: ["I like working."],
  images: [
    "https://tajex.nl/wp-content/uploads/2023/04/istockphoto-184276818-612x612-1.jpg",
  ],
  teacherId: 0,
  studentId: 0,
};

const wordCard3 = {
  partOfSpeech: "adjective",
  word: "light",
  definition: "Something not heavy.",
  translations: ["легкий"],
  sentences: ["This box is very light."],
  images: [
    "https://tajex.nl/wp-content/uploads/2023/04/istockphoto-184276818-612x612-1.jpg",
  ],
  teacherId: 0,
  studentId: 0,
};

const wordCard4 = {
  partOfSpeech: "adverb",
  word: "hardly",
  definition: "Very rarely.",
  translations: ["редко"],
  sentences: ["I hardly ever do that."],
  images: [
    "https://tajex.nl/wp-content/uploads/2023/04/istockphoto-184276818-612x612-1.jpg",
  ],
  teacherId: 0,
  studentId: 0,
};

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
    expect(res.status).toEqual(403);
  });
});

describe("Teacher reg special code DB error:", () => {
  test("Reg:", async () => {
    sinon.stub(TeacherCode, "findOne").throws(Error("Database error."));
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
    sinon.restore();
    expect(res.status).toEqual(500);
  });
});

describe("Teacher reg DB error:", () => {
  test("Reg:", async () => {
    sinon.stub(Teacher, "findOne").throws(Error("Database error."));
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
    sinon.restore();
    expect(res.status).toEqual(500);
  });
});

describe("Teacher reg save DB error:", () => {
  test("Reg:", async () => {
    sinon.stub(Teacher.prototype, "save").throws(Error("Database error."));
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
    sinon.restore();
    expect(res.status).toEqual(500);
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
    wordCard.teacherId = res.body.id;
    wordCard2.teacherId = res.body.id;
    wordCard3.teacherId = res.body.id;
    wordCard4.teacherId = res.body.id;
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
    expect(res.status).toEqual(403);
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
    expect(res.status).toEqual(404);
  });
});

describe("Teacher login find one DB error:", () => {
  test("Login:", async () => {
    sinon.stub(Teacher, "findOne").throws(Error("Database error."));
    const payload = {
      userName: TEACHER_NAME,
      password: TEACHER_PASSWORD,
    };
    const res = await request(app)
      .post("/api/v1/teacher/login")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    sinon.restore();
    expect(res.status).toEqual(500);
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
    expect(res.status).toEqual(403);
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

describe("Teacher validate token DB error find one:", () => {
  test("Validate:", async () => {
    sinon.stub(Teacher, "findOne").throws(Error("Database error."));
    const res = await request(app)
      .get("/api/v1/teacher/token")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    sinon.restore();
    expect(res.status).toEqual(500);
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
    expect(res.status).toEqual(403);
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

describe("Teacher register student code code save DB error:", () => {
  test("Register code:", async () => {
    sinon.stub(StudentCode.prototype, "save").throws(Error("Database error."));
    const payload = {
      studentName: STUDENT_NICKNAME,
    };
    const res = await request(app)
      .post("/api/v1/student/code/new")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    sinon.restore();
    expect(res.status).toEqual(500);
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

describe("Teacher register student code again:", () => {
  test("Register code:", async () => {
    const payload = {
      studentName: STUDENT_NICKNAME2,
    };
    const res = await request(app)
      .post("/api/v1/student/code/new")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("code");
    STUDENT_CODE2 = res.body.code;
  });
});

// student tests
//
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
    expect(res.status).toEqual(403);
  });
});

describe("Student reg special code DB error:", () => {
  test("Reg:", async () => {
    sinon.stub(StudentCode, "findOne").throws(Error("Database error."));
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
    sinon.restore();
    expect(res.status).toEqual(500);
  });
});

describe("Student reg save DB error:", () => {
  test("Reg:", async () => {
    sinon.stub(Student.prototype, "save").throws(Error("Database error."));
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
    sinon.restore();
    expect(res.status).toEqual(500);
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
    expect(res.body).not.toHaveProperty("password");
    wordCard.studentId = res.body.id;
    wordCard2.studentId = res.body.id;
    wordCard3.studentId = res.body.id;
    wordCard4.studentId = res.body.id;
  });
});

describe("Student reg same username:", () => {
  test("Reg:", async () => {
    const payload = {
      userName: STUDENT_NAME,
      password: STUDENT_PASSWORD,
      specialCode: STUDENT_CODE2,
    };
    const res = await request(app)
      .post("/api/v1/student/register")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(409);
  });
});

describe("Student reg same special code:", () => {
  test("Reg:", async () => {
    const payload = {
      userName: STUDENT_NAME2,
      password: STUDENT_PASSWORD2,
      specialCode: STUDENT_CODE,
    };
    const res = await request(app)
      .post("/api/v1/student/register")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(403);
  });
});

describe("Student login wrong body:", () => {
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
    expect(res.status).toEqual(404);
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
    expect(res.status).toEqual(403);
  });
});

describe("Student login find one DB error:", () => {
  test("Login:", async () => {
    sinon.stub(Student, "findOne").throws(Error("Database error."));
    const payload = {
      userName: STUDENT_NAME,
      password: STUDENT_PASSWORD,
    };
    const res = await request(app)
      .post("/api/v1/student/login")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    sinon.restore();
    expect(res.status).toEqual(500);
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

describe("Student get own data wrong jwt:", () => {
  test("Data:", async () => {
    const res = await request(app)
      .get("/api/v1/student/own")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${STUDENT_TOKEN} 123`)
      .set("Accept", "application/json");
    expect(res.status).toEqual(403);
  });
});

describe("Student get own data:", () => {
  test("Data:", async () => {
    const res = await request(app)
      .get("/api/v1/student/own")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${STUDENT_TOKEN}`)
      .set("Accept", "application/json");
    expect(res.status).toEqual(200);
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
    expect(res.status).toEqual(403);
  });
});

describe("Student validate token find one DB error:", () => {
  test("Validate:", async () => {
    sinon.stub(Student, "findOne").throws(Error("Database error."));
    const res = await request(app)
      .get("/api/v1/student/token")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${STUDENT_TOKEN}`);
    sinon.restore();
    expect(res.status).toEqual(500);
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

describe("Get students data wrong JWT", () => {
  test("Get:", async () => {
    const res = await request(app)
      .get("/api/v1/students")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN} test`);
    expect(res.status).toEqual(403);
  });
});

describe("Get students data find one DB error", () => {
  test("Get:", async () => {
    sinon.stub(Student, "findAll").throws(Error("Database error."));
    const res = await request(app)
      .get("/api/v1/students")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    sinon.restore();
    expect(res.status).toEqual(500);
  });
});

describe("Get students data", () => {
  test("Get:", async () => {
    const res = await request(app)
      .get("/api/v1/students")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("studentsData");
  });
});

// misc
describe("Some other function fails", () => {
  test("Bcrypt:", async () => {
    sinon.stub(bcrypt, "compareSync").throws(Error("Bcrypt error"));
    const payload = {
      userName: STUDENT_NAME,
      password: STUDENT_PASSWORD,
    };
    const res = await request(app)
      .post("/api/v1/student/login")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    sinon.restore();
    expect(res.status).toEqual(500);
  });
});

// cards
describe("Create word card no jwt", () => {
  test("Create:", async () => {
    const res = await request(app)
      .post("/api/v1/cards/word/new")
      .send(wordCard)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
  });
});

describe("Create word card wrong jwt", () => {
  test("Create:", async () => {
    const res = await request(app)
      .post("/api/v1/cards/word/new")
      .send(wordCard)
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN} 123`)
      .set("Accept", "application/json");
    expect(res.status).toEqual(403);
  });
});

describe("Create word card DB fail", () => {
  test("Create:", async () => {
    sinon
      .stub(WordCard.prototype, "save" as any)
      .throws(Error("Database error."));
    const res = await request(app)
      .post("/api/v1/cards/word/new")
      .send(wordCard)
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`)
      .set("Accept", "application/json");
    sinon.restore();
    expect(res.status).toEqual(500);
  });
});

describe("Create word card noun", () => {
  test("Create:", async () => {
    const res = await request(app)
      .post("/api/v1/cards/word/new")
      .send(wordCard)
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`)
      .set("Accept", "application/json");
    expect(res.status).toEqual(201);
  });
});

describe("Create word card verb", () => {
  test("Create:", async () => {
    const res = await request(app)
      .post("/api/v1/cards/word/new")
      .send(wordCard2)
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`)
      .set("Accept", "application/json");
    expect(res.status).toEqual(201);
  });
});

describe("Create word card adjective", () => {
  test("Create:", async () => {
    const res = await request(app)
      .post("/api/v1/cards/word/new")
      .send(wordCard3)
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`)
      .set("Accept", "application/json");
    expect(res.status).toEqual(201);
  });
});

describe("Create word card default part of speech.", () => {
  test("Create:", async () => {
    const res = await request(app)
      .post("/api/v1/cards/word/new")
      .send(wordCard4)
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`)
      .set("Accept", "application/json");
    expect(res.status).toEqual(201);
  });
});

describe("Create word card wrong student ID", () => {
  test("Create:", async () => {
    wordCard2.studentId = 0;
    const res = await request(app)
      .post("/api/v1/cards/word/new")
      .send(wordCard2)
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`)
      .set("Accept", "application/json");
    expect(res.status).toEqual(404);
  });
});

describe("Return new card", () => {
  test("Return:", async () => {
    const res = await request(app)
      .get("/api/v1/cards/word/study/new")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${STUDENT_TOKEN}`)
      .set("Accept", "application/json");
    expect(res.status).toEqual(200);
  });
});

// deletes
describe("Delete student code wrong JWT", () => {
  test("Delete", async () => {
    const payload = {
      studentName: STUDENT_NICKNAME2,
    };
    const res = await request(app)
      .delete("/api/v1/student/code/delete")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN} 123`);
    expect(res.status).toEqual(403);
  });
});

describe("Delete student code as a student", () => {
  test("Delete", async () => {
    const payload = {
      studentName: STUDENT_NICKNAME2,
    };
    const res = await request(app)
      .delete("/api/v1/student/code/delete")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${STUDENT_TOKEN}`);
    expect(res.status).toEqual(403);
  });
});

describe("Delete student code no student code with this name", () => {
  test("Delete", async () => {
    const payload = {
      studentName: STUDENT_NICKNAME2 + "test123",
    };
    const res = await request(app)
      .delete("/api/v1/student/code/delete")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    console.log(res.body);
    expect(res.status).toEqual(404);
  });
});

describe("Delete student code find one DB error", () => {
  test("Delete", async () => {
    sinon.stub(StudentCode, "findOne").throws(Error("Database error."));
    const payload = {
      studentName: STUDENT_NICKNAME2,
    };
    const res = await request(app)
      .delete("/api/v1/student/code/delete")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    sinon.restore();
    expect(res.status).toEqual(500);
  });
});

describe("Delete student code destroy DB error", () => {
  test("Delete", async () => {
    sinon
      .stub(StudentCode.prototype, "destroy")
      .throws(Error("Database error."));
    const payload = {
      studentName: STUDENT_NICKNAME2,
    };
    const res = await request(app)
      .delete("/api/v1/student/code/delete")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    sinon.restore();
    expect(res.status).toEqual(500);
  });
});

describe("Delete student code", () => {
  test("Delete", async () => {
    const payload = {
      studentName: STUDENT_NICKNAME2,
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

describe("Delete student wrong body", () => {
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

describe("Delete student no body", () => {
  test("Delete:", async () => {
    const res = await request(app)
      .delete("/api/v1/student/delete")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    expect(res.status).toEqual(400);
  });
});

describe("Delete student no JWT", () => {
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

describe("Delete student wrong JWT", () => {
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
    expect(res.status).toEqual(403);
  });
});

describe("Delete student no such student", () => {
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
    expect(res.status).toEqual(404);
  });
});

describe("Delete student as a student", () => {
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

describe("Delete student find one DB error", () => {
  test("Delete:", async () => {
    sinon.stub(Student, "findOne").throws(Error("Database error."));
    const payload = {
      studentName: STUDENT_NICKNAME,
    };
    const res = await request(app)
      .delete("/api/v1/student/delete")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    sinon.restore();
    expect(res.status).toEqual(500);
  });
});

describe("Delete student destroy DB error", () => {
  test("Delete:", async () => {
    sinon.stub(Student.prototype, "destroy").throws(Error("Database error."));
    const payload = {
      studentName: STUDENT_NICKNAME,
    };
    const res = await request(app)
      .delete("/api/v1/student/delete")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    sinon.restore();
    expect(res.status).toEqual(500);
  });
});

describe("Delete student", () => {
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

describe("Delete teacher wrong JWT", () => {
  test("Delete:", async () => {
    const res = await request(app)
      .delete("/api/v1/teacher/delete")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN + "test"} `);
    expect(res.status).toEqual(403);
  });
});

describe("Delete teacher no JWT", () => {
  test("Delete:", async () => {
    const res = await request(app)
      .delete("/api/v1/teacher/delete")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
  });
});

describe("Delete teacher destroy DB error", () => {
  test("Delete:", async () => {
    sinon.stub(Teacher.prototype, "destroy").throws(Error("Database error."));
    const res = await request(app)
      .delete("/api/v1/teacher/delete")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN} `);
    sinon.restore();
    expect(res.status).toEqual(500);
  });
});

describe("Delete teacher", () => {
  test("Delete:", async () => {
    const res = await request(app)
      .delete("/api/v1/teacher/delete")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN} `);
    expect(res.status).toEqual(200);
  });
});

describe("Delete teacher again", () => {
  test("Delete:", async () => {
    const res = await request(app)
      .delete("/api/v1/teacher/delete")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN} `);
    expect(res.status).toEqual(404);
  });
});

// after deletes

describe("Student validate token no student:", () => {
  test("Validate:", async () => {
    const res = await request(app)
      .get("/api/v1/student/token")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${STUDENT_TOKEN}`);
    console.log(res.body);
    expect(res.status).toEqual(404);
  });
});

describe("Teacher validate token no teacher:", () => {
  test("Validate:", async () => {
    const res = await request(app)
      .get("/api/v1/teacher/token")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TEACHER_TOKEN}`);
    expect(res.status).toEqual(404);
  });
});

afterAll(async () => {
  server.close();
});
