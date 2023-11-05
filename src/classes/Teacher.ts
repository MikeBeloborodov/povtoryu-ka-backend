import {
  TeacherRegBody,
  TeacherLoginBody,
  TeacherCredentialsBody,
  TeacherRegistrationBody,
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

export class TeacherRegistrationClass {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  specialCode: string;

  constructor({ userName, password, specialCode }: TeacherRegistrationBody) {
    this.userName = userName;
    this.password = password;
    this.specialCode = specialCode;
  }
}

export class TeacherLoginClass {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;

  constructor({ userName, password }: TeacherLoginBody) {
    this.userName = userName;
    this.password = password;
  }
}
