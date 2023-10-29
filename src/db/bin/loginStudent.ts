import { Student } from "../ormModels/Student";
import { StudentLoginRequestBody } from "../../interfaces/Student";
import { createToken } from "./createToken";
import express from "express";
import bcrypt from "bcrypt";

export const loginStudent = async (
  req: express.Request,
  res: express.Response,
) => {
  const studentData: StudentLoginRequestBody = req.body;
  const student: any = await Student.scope("withPassword").findOne({
    where: { userName: studentData.userName },
  });
  bcrypt.compare(
    studentData.password,
    student.password,
    async (err: any, result: boolean) => {
      if (!result || err) {
        return res.status(400).send({ error: "Wrong credentials." });
      } else {
        const token = createToken();
        student.update({ token: token });
        await student.save();
        return res.status(200).send({ token: token });
      }
    },
  );
};
