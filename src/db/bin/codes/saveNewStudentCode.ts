import express from "express";
import { StudentCode } from "../../ormModels/StudentCode";
import { Teacher } from "../../ormModels/Teacher";
import { createCode } from "./createCode";
import { DBError } from "../../../classes/Errors";
import { returnDecodedJWT } from "../../../bin/utils";
import { JWToken } from "../../../interfaces/Token";

export const saveNewStudentCode = async (req: express.Request) => {
  const token = returnDecodedJWT(req) as JWToken;
  try {
    const teacher: any = await Teacher.findOne({
      where: { userName: token.userName },
    });
    const code = createCode();
    const newStudentCode = StudentCode.build({
      code: code,
      teacherId: teacher.id,
      nickname: req.body.studentName,
    });
    return await newStudentCode.save();
  } catch (error) {
    throw new DBError();
  }
};
