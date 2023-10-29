import express from "express";
import { JWToken } from "../interfaces/Token";
import { veiryJWToken } from "../bin/utils";
import { validateRequestBody } from "../bin/validateRequestBody";
import { validateTokenHeader } from "../bin/validateTokenHeader";
import { deleteTeacher } from "../db/bin/deleteTeacher";

export const deleteTeacherHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  let validatedData;
  let JWToken;
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
    JWToken = veiryJWToken(
      validatedData.token,
      process.env.SECRET_TOKEN_KEY,
    ) as JWToken;
  } catch (verificationError) {
    return res.status(400).send({ error: "Wrong JWT." });
  }

  // delete teacher from DB
  try {
    const isDeleted = await deleteTeacher(JWToken.userName);
    if (isDeleted) {
      return res.status(200).send({ message: "Teacher deleted." });
    } else {
      return res.status(400).send({ error: "Could not find teacher in DB" });
    }
  } catch (dbError) {
    return res.status(500).send({ error: "Error with DB. Call admin." });
  }
};
