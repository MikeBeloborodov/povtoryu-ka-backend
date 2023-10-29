import { IsNotEmpty } from "class-validator";
import {
  NewStudentTokenRequestBody,
  StudentLoginRequestBody,
  StudentRegRequestBody,
} from "../interfaces/Student";

export class Student {
  id: number;

  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;

  nickname: string;

  createdAt: Date;

  updatedAt: Date;

  teacherId: number;

  @IsNotEmpty()
  specialCode: string;
}

export class StudentLoginInfo {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;

  constructor({ userName, password }: StudentLoginRequestBody) {
    (this.userName = userName), (this.password = password);
  }
}

export class NewStudentTokenInfo {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  studentName: string;

  @IsNotEmpty()
  teacherName: string;
  constructor({ token, studentName, teacherName }: NewStudentTokenRequestBody) {
    this.token = token;
    this.studentName = studentName;
    this.teacherName = teacherName;
  }
}

export class StudentRegInfo {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  specialCode: string;

  constructor({ userName, password, specialCode }: StudentRegRequestBody) {
    this.userName = userName;
    this.password = password;
    this.specialCode = specialCode;
  }
}
