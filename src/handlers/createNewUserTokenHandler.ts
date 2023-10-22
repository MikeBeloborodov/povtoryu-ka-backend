import express from "express";
import { NewStudentToken } from "../classes/classes";
import { NewUserTokenData } from "../interfaces/interfaces";
import { createNewUserToken } from "../bin/createNewUserToken";
import { checkToken } from "../db/bin/checkToken";
import { saveNewStudentToken } from "../db/bin/saveNewStudentToken";

export const createNewUserTokenHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  let studentToken;
  let studentTokenErrors;
  // check with class validator
  try {
    const [studentTokenRes, studentTokenErrorsRes] = await createNewUserToken(
      req.body,
    );
    studentTokenErrors = studentTokenErrorsRes;
    if (studentTokenErrors.length > 0) {
      throw { error_message: "Wrong data provided for new user token." };
    }
    studentToken = studentTokenRes;
  } catch (error) {
    return res
      .status(400)
      .send({ error: "Wrong data provided for new user token" });
  }
  // check teacher token validity
  try {
    const res = await checkToken(
      studentToken.token,
      studentToken.teacherName,
      "teacher",
    );
    if (!res)
      throw { error_message: "Provided teacher token or username is invalid." };
  } catch (validity_errors) {
    return res.status(400).send({
      error: "Not a valid teacher token",
      error_message: validity_errors,
    });
  }
  // create new student token
  try {
    const newStudentToken = await saveNewStudentToken(
      studentToken.teacherName,
      studentToken.studentName,
    );
    if (!newStudentToken) throw { error_message: "Could not save to db" };
    return res.status(201).send(newStudentToken);
  } catch (db_error) {
    return res.status(500).send({ error: "Could not save to db", db_error });
  }
};
