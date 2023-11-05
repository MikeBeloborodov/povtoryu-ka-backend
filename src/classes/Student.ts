import { IsNotEmpty } from "class-validator";
import {
  NewStudentCodeRequestBody,
  StudentLoginRequestBody,
  StudentRegRequestBody,
  DeleteStudentCodeRequestBody,
  StudentDeleteRequestBody,
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

export class StudentLoginClass {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;

  constructor({ userName, password }: StudentLoginRequestBody) {
    (this.userName = userName), (this.password = password);
  }
}

export class NewStudentCodeRegistrationClass {
  @IsNotEmpty()
  studentName: string;

  constructor({ studentName }: NewStudentCodeRequestBody) {
    this.studentName = studentName;
  }
}

export class DeleteStudentCodeClass {
  @IsNotEmpty()
  studentName: string;

  constructor({ studentName }: DeleteStudentCodeRequestBody) {
    this.studentName = studentName;
  }
}

export class StudentRegistrationClass {
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

export class StudentDeleteClass {
  @IsNotEmpty()
  studentName: string;

  constructor({ studentName }: StudentDeleteRequestBody) {
    this.studentName = studentName;
  }
}
