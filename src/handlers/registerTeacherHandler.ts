import express from "express";
import { saveTeacher } from "../db/bin/saveTeacher";
import { validateRequestBody } from "../bin/validateRequestBody";
import { validateTeacherReg } from "../bin/validateTeacherReg";
import { validateSpecialCode } from "../db/bin/validateSpecialCode";
import { returnTeacher } from "../db/bin/returnTeacher";

export const registerTeacherHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  let validatedData;

  // validate req body
  try {
    validatedData = await validateRequestBody(req, validateTeacherReg);
  } catch (validationError) {
    return res
      .status(400)
      .send({ error: "Wrong request body", error_message: validationError });
  }
  // validate special code
  try {
    if (!validateSpecialCode(validatedData.specialCode, "teacher")) {
      return res.status(400).send({ error: "Wrong special code." });
    }
  } catch (dbError) {
    return res.status(500).send({ error: "Error with DB. Call admin." });
  }

  // check if already exists
  try {
    const teacher = await returnTeacher(validatedData.userName);
    if (teacher) throw "Duplication error.";
  } catch (duplicationError) {
    return res.status(409).send({ error: duplicationError });
  }

  // save a teacher to DB
  try {
    await saveTeacher(validatedData);
  } catch (error) {
    return res
      .status(500)
      .send({ error: "Could not save data to db.", error_message: error });
  }

  return res.status(201).send({ message: "Teacher registered." });
};
