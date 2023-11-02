import express from "express";
import { DBError, EntityAlreadyExistsInDB } from "../../classes/Errors";
import { Teacher } from "../ormModels/Teacher";
import { Student } from "../ormModels/Student";

export const checkForDuplication = async (
  req: express.Request,
  role: string,
) => {
  switch (role) {
    case "teacher":
      let teacher;
      try {
        teacher = await Teacher.findOne({
          where: { userName: req.body.userName },
        });
      } catch (error) {
        throw new DBError();
      }
      if (teacher) throw new EntityAlreadyExistsInDB();
      break;
    case "student":
      let student;
      try {
        student = await Student.findOne({
          where: { userName: req.body.userName },
        });
        throw new DBError();
      } catch (error) {}
      if (student) throw new EntityAlreadyExistsInDB();
      break;
  }
};
