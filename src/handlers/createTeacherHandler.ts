import express from "express";
import { createTeacherObject } from "../bin/createTeacher";
import { saveTeacher } from "../db/bin/saveTeacher";

export const createTeacherHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  let teacher;
  let teacherErrors;
  try {
    // process data from user, check it and create teacher object
    const [teacherRes, teacherErrorsRes] = await createTeacherObject(req.body);
    teacherErrors = teacherErrorsRes;
    // exit if any errors and send them to user
    if (teacherErrorsRes.length > 0) throw teacherErrors;
    teacher = teacherRes;
  } catch (error) {
    return res
      .status(400)
      .send({ error: "Wrong data provided.", error_message: teacherErrors });
  }
  try {
    // save user to DB
    teacher = await saveTeacher(teacher);
  } catch (error) {
    return res
      .status(500)
      .send({ error: "Could not save data to db.", error_message: error });
  }
  // if all good
  return res.status(201).send(teacher);
};
