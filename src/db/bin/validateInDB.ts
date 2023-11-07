import { JWToken } from "../../interfaces/Token";
import { Teacher } from "../ormModels/Teacher";
import { Student } from "../ormModels/Student";
import {
  DBError,
  NoStudentFoundError,
  NoTeacherFoundError,
} from "../../classes/Errors";
import { returnDecodedJWT } from "../../bin/utils";
import express from "express";

export const validateInDB = async (req: express.Request) => {
  const token = returnDecodedJWT(req) as JWToken;
  switch (token.role) {
    case "teacher":
      let teacher;
      try {
        teacher = await Teacher.findOne({
          where: {
            userName: token.userName,
          },
        });
      } catch (error) {
        throw new DBError();
      }
      if (!teacher) throw new NoTeacherFoundError();
      break;
    case "student":
      let student;
      try {
        student = await Student.findOne({
          where: {
            userName: token.userName,
          },
        });
      } catch (error) {
        throw new DBError();
      }
      if (!student) throw new NoStudentFoundError();
      break;
  }
};
