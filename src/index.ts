import express from "express";
import parser from "body-parser";
import cors from "cors";
import bodyParserErrorHandler from "express-body-parser-error-handler";
import { getWordsHandler } from "./handlers/getWordsHandler";
import { testDBHandler } from "./handlers/testDBHandler";
import { createTeacherHandler } from "./handlers/createTeacherHandler";
import { sequelize } from "./db/db";
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

app.get("/api/v1/test", testDBHandler);

app.post("/api/v1/teacher", createTeacherHandler);

app.listen(port, () => {
  console.log("Server is running on http://localhost:8080");
});
