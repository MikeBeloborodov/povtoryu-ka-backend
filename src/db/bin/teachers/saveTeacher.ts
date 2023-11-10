import bcrypt from "bcrypt";
import express from "express";
import { Teacher as TeacherModel } from "../../ormModels/Teacher";
import { DBError } from "../../../classes/Errors";

export const saveTeacher = async (req: express.Request) => {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(req.body.password, saltRounds);
  const teacher = TeacherModel.build({
    userName: req.body.userName,
    password: hash,
    role: "teacher",
  });
  try {
    return await teacher.save();
  } catch (error) {
    throw new DBError();
  }
};
