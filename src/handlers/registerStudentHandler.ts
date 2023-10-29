import express from "express";
import { validateStudentRegBody } from "../bin/validateStudentRegBody";
import { validateRequestBody } from "../bin/validateRequestBody";
import { validateSpecialCode } from "../db/bin/validateSpecialCode";
import { saveStudent } from "../db/bin/saveStudent";

export const registerStudentHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  let validatedData;

  // validate req body
  try {
    validatedData = await validateRequestBody(req, validateStudentRegBody);
  } catch (validationError) {
    return res
      .status(400)
      .send({ error: "Wrong request body", error_message: validationError });
  }

  // validate special code
  try {
    if (!(await validateSpecialCode(validatedData.specialCode, "student"))) {
      return res.status(400).send({ error: "Wrong special code." });
    }
  } catch (dbError) {
    return res.status(500).send({ error: "Error with DB. Call admin." });
  }

  // save a user to DB
  try {
    await saveStudent(validatedData);
  } catch (error) {
    return res.status(500).send({ error: "Error with DB. Call admin." });
  }

  return res.status(201).send({ message: "Student registered." });
};
