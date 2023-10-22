import express from "express";
import parser from "body-parser";
import cors from "cors";
import bodyParserErrorHandler from "express-body-parser-error-handler";
import { getWordsHandler } from "./handlers/getWordsHandler";
import { createTeacherHandler } from "./handlers/createTeacherHandler";
import { sequelize } from "./db/db";
import { createUserHandler } from "./handlers/createUserHandler";
import { loginTeacherHandler } from "./handlers/loginTeacherHandler";
import { checkTeacherTokenHandler } from "./handlers/checkTeacherTokenHandler";
import { createNewUserTokenHandler } from "./handlers/createNewUserTokenHandler";
import { loginUserHandler } from "./handlers/loginUserHandler";
import { checkUserTokenHandler } from "./handlers/checkUserTokenHandler";

require("dotenv").config();

// db connection
try {
  (async () => {
    await sequelize.authenticate();
    console.log("Connected to DB.");
  })();
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

// teachers endpoints
app.post("/api/v1/teacher", createTeacherHandler);

app.post("/api/v1/teacher/login", loginTeacherHandler);

app.post("/api/v1/teacher/token", checkTeacherTokenHandler);

// users enpoints
app.post("/api/v1/user", createUserHandler);

app.post("/api/v1/user/login", loginUserHandler);

app.post("/api/v1/user/token/new", createNewUserTokenHandler);

app.post("/api/v1/user/token", checkUserTokenHandler);

app.listen(port, () => {
  console.log("Server is running on http://localhost:8080");
});
