import express from "express";
import { createLoginTeacherObject } from "../bin/loginTeacher";
import { loginTeacher } from "../db/bin/loginTeacher";

export const loginTeacherHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  let teacherLogin;
  let teacherLoginErrors;
  // check provided data with class validator
  try {
    const [teacherLoginRes, teacherLoginErrorsRes] =
      await createLoginTeacherObject(req.body);
    if (teacherLoginErrorsRes.length > 0) {
      teacherLoginErrors = teacherLoginErrorsRes;
      throw "Bad information provided";
    }
    teacherLogin = teacherLoginRes;
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      error: "Bad information provided",
      error_message: teacherLoginErrors,
    });
  }
  // get teacher from DB
  try {
    const teacherAuth = await loginTeacher(teacherLogin);
    if (teacherAuth) return res.status(200).send(teacherAuth);
    else {
      throw "Wrong credentials";
    }
  } catch (db_error) {
    return res.status(400).send({
      error_message: db_error,
    });
  }
};
