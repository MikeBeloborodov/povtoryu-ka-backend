import express from "express";
import { StudentCode } from "../ormModels/StudentCode";
import { returnDecodedJWT } from "../../bin/utils";
import { JWToken } from "../../interfaces/Token";
import { DBError, NoStudentCodeError } from "../../classes/Errors";

export const deleteStudentCode = async (req: express.Request) => {
  const token = returnDecodedJWT(req) as JWToken;
  let code;
  try {
    code = await StudentCode.findOne({
      where: { teacherId: token.id, nickname: req.body.studentName },
    });
  } catch (error) {
    console.log(error);
    throw new DBError();
  }
  console.log(token.id);
  console.log(req.body.studentName);
  if (!code) throw new NoStudentCodeError();
  try {
    await code.destroy();
  } catch (error) {
    console.log(error);
    throw new DBError();
  }
};
