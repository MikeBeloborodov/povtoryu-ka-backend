import express from "express";
import { returnDecodedJWT } from "../../../bin/utils";
import { Teacher } from "../../ormModels/Teacher";
import { JWToken } from "../../../interfaces/Token";
import { DBError } from "../../../classes/Errors";

export const deleteTeacher = async (req: express.Request) => {
  const token = returnDecodedJWT(req) as JWToken;
  let teacher: any;
  try {
    teacher = await Teacher.findOne({ where: { userName: token.userName } });
    await teacher.destroy();
  } catch (error) {
    throw new DBError();
  }
};
