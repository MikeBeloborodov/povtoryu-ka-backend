import bcrypt from "bcrypt";
import express from "express";
import { Student as StudentModel } from "../ormModels/Student";
import { StudentCode } from "../ormModels/StudentCode";
import { DBError } from "../../classes/Errors";

export const saveStudent = async (req: express.Request) => {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(req.body.password, saltRounds);
  const studentCode: any = await StudentCode.findOne({
    where: { code: req.body.specialCode },
  });
  const user = StudentModel.build({
    userName: req.body.userName,
    password: hash,
    teacherId: studentCode.teacherId,
    nickname: studentCode.nickname,
    specialCode: studentCode.code,
    role: "student",
  });
  try {
    await user.save();
  } catch (error) {
    throw new DBError();
  }
};
