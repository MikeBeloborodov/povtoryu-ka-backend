import { Teacher } from "../ormModels/Teacher";
import { TeacherLoginInfo } from "../../classes/Teacher";
import { createToken } from "./createToken";
import bcrypt from "bcrypt";
import express from "express";

export const loginTeacher = async (
  res: express.Response,
  data: TeacherLoginInfo,
): Promise<void> => {
  const teacher: any = await Teacher.scope("withPassword").findOne({
    where: { userName: data.userName },
  });

  // compare provided password and hashed password
  bcrypt.compare(
    data.password,
    teacher.password,
    async (err: any, result: boolean) => {
      console.log(data.password);
      console.log(teacher.password);
      if (result === false || err) {
        return res.status(400).send({ error: "Wrong credentials." });
      } else {
        const token = createToken();
        teacher.update({ token: token });
        await teacher.save();
        return res.status(200).send({ token: token });
      }
    },
  );
};
