import express from "express";
import { StudentCode } from "../../ormModels/StudentCode";
import { TeacherCode } from "../../ormModels/TeacherCode";
import { DBError, SpecialCodeValidationError } from "../../../classes/Errors";

export const validateSpecialCode = async (
  req: express.Request,
  role: string,
) => {
  switch (role) {
    case "teacher":
      let teacherCode;
      try {
        teacherCode = await TeacherCode.findOne({
          where: { code: req.body.specialCode },
        });
      } catch (error) {
        throw new DBError();
      }
      if (!teacherCode) throw new SpecialCodeValidationError();
      break;
    case "student":
      let studentCode;
      try {
        studentCode = await StudentCode.findOne({
          where: { code: req.body.specialCode },
        });
      } catch (error) {
        throw new DBError();
      }
      if (!studentCode) throw new SpecialCodeValidationError();
      break;
  }
};
