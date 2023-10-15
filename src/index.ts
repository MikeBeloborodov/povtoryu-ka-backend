import express from "express";
import parser from "body-parser";
import cors from "cors";
import bodyParserErrorHandler from "express-body-parser-error-handler";
import { getWordsHandler } from "./handlers/getWordsHandler";
require("dotenv").config();

const app = express();
const port = 8080;

app.use(parser.json());
app.use(cors());
app.use(bodyParserErrorHandler());

// get an array of words from user, process them and save to DB
app.post("/api/v1/words", getWordsHandler);

app.listen(port, () => {
  console.log("Server is running on http://localhost:8080");
});
