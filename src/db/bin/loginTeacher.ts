import {
  DBError,
  NoTeacherFoundError,
  WrongPasswordError,
} from "../../classes/Errors";
import { Teacher } from "../ormModels/Teacher";
import { createJWToken } from "./createJWToken";
import bcrypt from "bcrypt";
import express from "express";

export const loginTeacher = async (req: express.Request) => {
  let teacher: any;
  try {
    teacher = await Teacher.scope("withPassword").findOne({
      where: { userName: req.body.userName },
    });
  } catch (error) {
    throw new DBError();
  }

  if (!teacher) throw new NoTeacherFoundError();

  // compare provided password and hashed password
  const isMatch = bcrypt.compareSync(req.body.password, teacher.password);
  if (isMatch) {
    const token = createJWToken(teacher.id, teacher.userName, teacher.role);
    return token;
  } else {
    throw new WrongPasswordError();
  }
};
