import bcrypt from "bcrypt";
import express from "express";
import { Student } from "../../ormModels/Student";
import { createJWToken } from "../createJWToken";
import {
  DBError,
  WrongPasswordError,
  NoStudentFoundError,
} from "../../../classes/Errors";

export const loginStudent = async (req: express.Request) => {
  let student: any;
  try {
    student = await Student.scope("withPassword").findOne({
      where: { userName: req.body.userName },
    });
  } catch (error) {
    throw new DBError();
  }
  if (!student) throw new NoStudentFoundError();

  const isMatch = bcrypt.compareSync(req.body.password, student.password);
  if (isMatch) {
    const token = createJWToken(student.id, student.userName, student.role);
    return token;
  } else {
    throw new WrongPasswordError();
  }
};
