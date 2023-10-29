import {
  TeacherRegBody,
  TeacherLoginBody,
  TeacherCredentialsBody,
} from "../interfaces/Teacher";
import { IsNotEmpty } from "class-validator";

export class TeacherRegInfo {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  specialCode: string;

  constructor({ userName, password, specialCode }: TeacherRegBody) {
    this.userName = userName;
    this.password = password;
    this.specialCode = specialCode;
  }
}

export class TeacherLoginInfo {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;

  constructor({ userName, password }: TeacherLoginBody) {
    this.userName = userName;
    this.password = password;
  }
}

export class TeacherCredentialsInfo {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  teacherName: string;

  constructor({ token, teacherName }: TeacherCredentialsBody) {
    this.token = token;
    this.teacherName = teacherName;
  }
}
