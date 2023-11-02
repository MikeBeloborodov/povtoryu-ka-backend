import { getStudentsData } from "../db/bin/getStudentsData";
import { validateTokenHeader } from "../bin/validateTokenHeader";
import { validateRequestBody } from "../bin/validateRequestBody";
import express from "express";
import { verifyJWT } from "../bin/utils";
import { JWToken } from "../interfaces/Token";

export const returnStudentsDataHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  let validatedData;
  let JWToken: JWToken;

  // validate req body
  try {
    validatedData = await validateRequestBody(req, validateTokenHeader);
  } catch (validationErrors) {
    return res
      .status(400)
      .send({ error: "Wrong request body", error_message: validationErrors });
  }

  // validate teacher token
  try {
    JWToken = verifyJWT(validatedData.token) as JWToken;
  } catch (verificationError) {
    return res.status(400).send({ error: "Wrong JWT." });
  }

  //send users data
  try {
    const studentsData = await getStudentsData(JWToken.userName);
    if (studentsData) {
      return res.status(200).send(studentsData);
    } else {
      return res.status(404).send({ error: "No students found." });
    }
  } catch (db_error) {
    return res.status(500).send({ error: "Error with DB. Call admin." });
  }
};
