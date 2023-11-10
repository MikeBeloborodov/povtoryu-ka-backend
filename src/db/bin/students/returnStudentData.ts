import express from "express";
import { returnDecodedJWT } from "../../../bin/utils";
import { JWToken } from "../../../interfaces/Token";
import { Student } from "../../ormModels/Student";
import { DBError } from "../../../classes/Errors";

export const returnStudentData = async (
  req: express.Request,
  ownData: boolean = false,
  studentName: string = "",
) => {
  let userName;
  let student;
  if (ownData) {
    const token = returnDecodedJWT(req) as JWToken;
    userName = token.userName;
  } else {
    userName = studentName;
  }
  try {
    student = await Student.scope("studentOwnScope").findOne({
      where: {
        userName: userName,
      },
    });
  } catch (error) {
    throw new DBError();
  }
  return student;
};
