import { Teacher } from "../ormModels/Teacher";
import { Student } from "../ormModels/Student";
import express from "express";
import { returnDecodedJWT } from "../../bin/utils";
import { JWToken } from "../../interfaces/Token";
import { DBError } from "../../classes/Errors";

export const getStudentsData = async (req: express.Request) => {
  const token = returnDecodedJWT(req) as JWToken;
  let teacher: any;
  try {
    teacher = await Teacher.findOne({
      where: { userName: token.userName },
    });
    const users = await Student.scope("teacherScope").findAll({
      where: { teacherId: teacher.id },
      order: [["id", "ASC"]],
    });
    return users;
  } catch (error) {
    throw new DBError();
  }
};
