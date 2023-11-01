import {
  TeacherRegBody,
  TeacherLoginBody,
  TeacherCredentialsBody,
} from "../interfaces/Teacher";
import { IsNotEmpty } from "class-validator";

export class Teacher {
  id: number;

  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;

  createdAt: Date;

  updatedAt: Date;

  @IsNotEmpty()
  specialCode: string;

  role: string;
}

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
