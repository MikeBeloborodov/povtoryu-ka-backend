import express from "express";
import parser from "body-parser";
import cors from "cors";
import { registerTeacherHandler } from "./handlers/teacher/registerTeacherHandler";
import { sequelize } from "./db/db";
import { loginTeacherHandler } from "./handlers/teacher/loginTeacherHandler";
import { validateTeacherTokenHandler } from "./handlers/teacher/validateTeacherTokenHandler";
import { registerNewStudentCodeHandler } from "./handlers/student/registerNewStudentCodeHandler";
import { registerStudentHandler } from "./handlers/student/registerStudentHandler";
import { loginStudentHandler } from "./handlers/student/loginStudentHandler";
import { validateStudentTokenHandler } from "./handlers/student/validateStudentTokenHandler";
import { returnStudentsDataHandler } from "./handlers/student/returnStudentsDataHandler";
import { deleteTeacherHandler } from "./handlers/teacher/deleteTeacherHandler";
import { deleteStudentCodeHandler } from "./handlers/student/deleteStudentCodeHandler";
import { deleteStudentHandler } from "./handlers/student/deleteStudentHandler";
import { createWordCardHandler } from "./handlers/cards/createWordCardHandler";
import { returnStudentOwnData } from "./handlers/student/returnStudentOwnData";
import { returnNewWordCardHandler } from "./handlers/cards/returnNewWordCardHandler";
import { answerWordHandler } from "./handlers/cards/answerWordHandler";
import { returnCardsCountHandler } from "./handlers/student/returnCardsCountHandler";
import { returnReviewWordCardHandler } from "./handlers/cards/returnReviewWordCardHandler";
import { createSentenceCardHandler } from "./handlers/cards/createSentenceCardHandler";
import { returnNewSentenceCardHandler } from "./handlers/cards/returnNewSentenceCardHandler";
import { answerSentenceHandler } from "./handlers/cards/answerSentenceHandler";
import { returnCardAudioHandler } from "./handlers/cards/returnCardAudioHandler";
import { returnReviewSentenceCardHandler } from "./handlers/cards/returnReviewSentenceCardHandler";

require("dotenv").config();

// db connection
sequelize.authenticate();

const app = express();
const port = 8080;

const jsonParser = parser.json();

app.use(cors());

// teacher endpoints
app.post("/api/v1/teacher/register", jsonParser, registerTeacherHandler);

app.post("/api/v1/teacher/login", jsonParser, loginTeacherHandler);

app.get("/api/v1/teacher/token", jsonParser, validateTeacherTokenHandler);

app.delete("/api/v1/teacher/delete", jsonParser, deleteTeacherHandler);

// student enpoints
app.post("/api/v1/student/register", jsonParser, registerStudentHandler);

app.post("/api/v1/student/login", jsonParser, loginStudentHandler);

app.delete("/api/v1/student/delete", jsonParser, deleteStudentHandler);

app.post("/api/v1/student/code/new", jsonParser, registerNewStudentCodeHandler);

app.delete("/api/v1/student/code/delete", jsonParser, deleteStudentCodeHandler);

app.get("/api/v1/student/token", jsonParser, validateStudentTokenHandler);

app.get("/api/v1/students", jsonParser, returnStudentsDataHandler);

app.get("/api/v1/student/own", jsonParser, returnStudentOwnData);

app.get("/api/v1/student/cardsCount", jsonParser, returnCardsCountHandler);

// cards
app.get("/api/v1/cards/audio", jsonParser, returnCardAudioHandler);

app.post("/api/v1/cards/word/new", jsonParser, createWordCardHandler);

app.post("/api/v1/cards/sentence/new", createSentenceCardHandler);

app.get("/api/v1/cards/word/study/new", jsonParser, returnNewWordCardHandler);

app.get(
  "/api/v1/cards/sentence/study/new",
  jsonParser,
  returnNewSentenceCardHandler,
);

app.get(
  "/api/v1/cards/word/study/review",
  jsonParser,
  returnReviewWordCardHandler,
);

app.get("/api/v1/cards/sentence/study/review", returnReviewSentenceCardHandler);

app.post("/api/v1/cards/word/study/answer", jsonParser, answerWordHandler);

app.post(
  "/api/v1/cards/sentence/study/answer",
  jsonParser,
  answerSentenceHandler,
);

export const server = app.listen(port, () => {
  console.log("Server is running on http://localhost:8080");
});

export default app;
