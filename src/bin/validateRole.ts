import express from "express";
import { Student } from "../db/ormModels/Student";
import { Teacher } from "../db/ormModels/Teacher";
import { returnDecodedJWT } from "./utils";
import { JWToken } from "../interfaces/Token";
import { DBError, RoleRequirementError } from "../classes/Errors";

export const validateRole = async (
  req: express.Request,
  requiredRole: string,
) => {
  const token = returnDecodedJWT(req) as JWToken;
  switch (requiredRole) {
    case "teacher":
      let teacher: any;
      try {
        teacher = await Teacher.findOne({
          where: {
            userName: token.userName,
          },
        });
      } catch (error) {
        throw new DBError();
      }
      if (!teacher || teacher.role !== requiredRole) {
        throw new RoleRequirementError();
      }
      break;
    case "student":
      let student: any;
      try {
        student = await Student.findOne({
          where: { userName: token.userName },
        });
      } catch (error) {
        throw new DBError();
      }
      if (!student || student.role !== requiredRole) {
        throw new RoleRequirementError();
      }
      break;
  }
};
