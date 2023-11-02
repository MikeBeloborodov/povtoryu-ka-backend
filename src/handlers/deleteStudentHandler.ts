import express from "express";
import { JWToken } from "../interfaces/Token";
import { verifyJWT } from "../bin/utils";
import { validateRequestBody } from "../bin/validateRequestBody";
import { validateTokenHeader } from "../bin/validateTokenHeader";
import { deleteStudent } from "../db/bin/deleteStudent";
import { validateRole } from "../bin/validateRole";
import { validateStudentDelete } from "../bin/validateStudentDelete";

export const deleteStudentHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  let rawToken;
  let JWToken;
  let validatedData;

  // validate req body
  try {
    validatedData = await validateRequestBody(req, validateStudentDelete);
  } catch (validationError) {
    return res.status(400).send({ error: "Invalid request body." });
  }

  // validate req header
  try {
    rawToken = await validateRequestBody(req, validateTokenHeader);
  } catch (validationErrors) {
    return res
      .status(400)
      .send({ error: "Wrong request body", error_message: validationErrors });
  }

  // validate token
  try {
    JWToken = verifyJWT(rawToken.token) as JWToken;
  } catch (verificationError) {
    return res.status(400).send({ error: "Wrong JWT." });
  }

  // validate role
  try {
    const isValid = await validateRole(JWToken.userName, "teacher");
    if (!isValid) {
      return res
        .status(403)
        .send({ error: "You are not allowed to delete users." });
    }
  } catch (dbError) {
    return res.status(500).send({ error: "Error with DB. Call admin." });
  }

  // delete student from DB
  try {
    const isDeleted = await deleteStudent(
      validatedData.studentName,
      JWToken.id,
    );
    if (isDeleted) {
      return res.status(200).send({ message: "Student deleted." });
    } else {
      return res.status(400).send({ error: "Could not find student in DB" });
    }
  } catch (dbError) {
    return res.status(500).send({ error: "Error with DB. Call admin." });
  }
};
