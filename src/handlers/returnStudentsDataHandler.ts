import { getStudentsData } from "../db/bin/getStudentsData";
import { validateTeacherCredentials } from "../bin/createTeacherCredentials";
import { validateRequestBody } from "../bin/validateRequestBody";
import { validateToken } from "../db/bin/validateToken";
import express from "express";

export const returnStudentsDataHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  let validatedData;
  // check req body
  try {
    validatedData = await validateRequestBody(req, validateTeacherCredentials);
  } catch (validationError) {
    return res
      .status(400)
      .send({ error: "Wrong request body", error_message: validationError });
  }

  // check teacher token validity
  try {
    if (
      !validateToken(validatedData.token, validatedData.userName, "teacher")
    ) {
      return res
        .status(400)
        .send({ error: "Wrong token or username provided." });
    }
  } catch (dbError) {
    return res.status(500).send({ error: "Error with DB. Call admin." });
  }

  //send users data
  try {
    const studentsData = await getStudentsData(validatedData.teacherName);
    if (studentsData) {
      return res.status(200).send(studentsData);
    } else {
      return res.status(404).send({ error: "No students found." });
    }
  } catch (db_error) {
    return res.status(500).send({ error: "Error with DB. Call admin." });
  }
};
