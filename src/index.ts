import express from "express";
import parser from "body-parser";
import cors from "cors";
import bodyParserErrorHandler from "express-body-parser-error-handler";
import { getWordsHandler } from "./handlers/getWordsHandler";
import { registerTeacherHandler } from "./handlers/registerTeacherHandler";
import { sequelize } from "./db/db";
import { loginTeacherHandler } from "./handlers/loginTeacherHandler";
import { validateTeacherTokenHandler } from "./handlers/validateTeacherTokenHandler";
import { registerNewStudentCodeHandler } from "./handlers/registerNewStudentCodeHandler";
import { registerStudentHandler } from "./handlers/registerStudentHandler";
import { loginStudentHandler } from "./handlers/loginStudentHandler";
import { validateStudentTokenHandler } from "./handlers/validateStudentTokenHandler";
import { returnStudentsDataHandler } from "./handlers/returnStudentsDataHandler";
import { deleteTeacherHandler } from "./handlers/deleteTeacherHandler";
import { deleteStudentCodeHandler } from "./handlers/deleteStudentCodeHandler";
import { deleteStudentHandler } from "./handlers/deleteStudentHandler";

require("dotenv").config();

// db connection
try {
  sequelize.authenticate();
} catch (error) {
  console.log("Unable to connect to DB.");
  console.log(error);
}

const app = express();
const port = 8080;

app.use(parser.json());
app.use(cors());
app.use(bodyParserErrorHandler());

// get an array of words from user, process them and save to DB
app.post("/api/v1/words", getWordsHandler);

// teacher endpoints
app.post("/api/v1/teacher/register", registerTeacherHandler);

app.post("/api/v1/teacher/login", loginTeacherHandler);

app.get("/api/v1/teacher/token", validateTeacherTokenHandler);

app.delete("/api/v1/teacher/delete", deleteTeacherHandler);

// student enpoints
app.post("/api/v1/student/register", registerStudentHandler);

app.post("/api/v1/student/login", loginStudentHandler);

app.delete("/api/v1/student/delete", deleteStudentHandler);

app.post("/api/v1/student/code/new", registerNewStudentCodeHandler);

app.delete("/api/v1/student/code/delete", deleteStudentCodeHandler);

app.get("/api/v1/student/token", validateStudentTokenHandler);

app.get("/api/v1/students", returnStudentsDataHandler);

export const server = app.listen(port, () => {
  console.log("Server is running on http://localhost:8080");
});

export default app;
