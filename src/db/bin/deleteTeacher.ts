import express from "express";
import { returnDecodedJWT, returnRawJWT } from "../../bin/utils";
import { Teacher } from "../ormModels/Teacher";
import { JWToken } from "../../interfaces/Token";
import { DBError, NoTeacherFoundError } from "../../classes/Errors";
import { JWTBlackList } from "../ormModels/JWTBlackList";

export const deleteTeacher = async (req: express.Request) => {
  const token = returnDecodedJWT(req) as JWToken;
  const tokenRaw = returnRawJWT(req);
  let teacher: any;
  try {
    teacher = await Teacher.findOne({ where: { userName: token.userName } });
  } catch (error) {
    throw new DBError();
  }
  if (!teacher) throw new NoTeacherFoundError();
  try {
    await teacher.destroy();

    // add this teacher JWT to blacklist
    const blacklistedJWT = JWTBlackList.build({
      jwt: tokenRaw,
      userName: token.userName,
      role: token.role,
    });
    await blacklistedJWT.save();
  } catch (error) {
    throw new DBError();
  }
};
