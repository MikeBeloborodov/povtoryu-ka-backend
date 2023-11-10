import express from "express";
import { Student } from "../../ormModels/Student";
import { returnDecodedJWT } from "../../../bin/utils";
import { JWToken } from "../../../interfaces/Token";
import { DBError, NoStudentFoundError } from "../../../classes/Errors";

export const deleteStudent = async (req: express.Request) => {
  const token = returnDecodedJWT(req) as JWToken;
  let student;
  try {
    student = await Student.findOne({
      where: { nickname: req.body.studentName, teacherId: token.id },
    });
  } catch (error) {
    throw new DBError();
  }
  if (!student) throw new NoStudentFoundError();
  try {
    await student.destroy();
  } catch (error) {
    throw new DBError();
  }
};
