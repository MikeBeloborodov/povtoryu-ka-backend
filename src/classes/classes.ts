import { IsNotEmpty, IsInt } from "class-validator";

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

  token: string;
}

export class TeacherLoginInformation {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;
}

export class UserLoginInformation {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;
}

export class User {
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

export class Words {
  words: Words[];
}

export class Word {
  @IsNotEmpty()
  word: string;

  @IsNotEmpty()
  partOfSpeech: string;

  @IsNotEmpty()
  partOfSpeechRu: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  theme: string;

  @IsNotEmpty()
  @IsInt()
  teacherId: number;

  @IsNotEmpty()
  @IsInt()
  studentId: number;
}

export class Card {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  definition: string;

  @IsNotEmpty()
  images: ImageObject[];

  @IsNotEmpty({
    each: true,
  })
  sentences: string[];

  @IsNotEmpty()
  newCard: boolean;

  @IsNotEmpty()
  partOfSpeech: string;

  @IsNotEmpty()
  partOfSpeechRu: string;

  @IsNotEmpty()
  theme: string;

  @IsNotEmpty({
    each: true,
  })
  translation: string[];

  @IsNotEmpty()
  word: string;

  @IsNotEmpty()
  @IsInt()
  teacherId: number;

  @IsNotEmpty()
  @IsInt()
  studentId: number;

  @IsNotEmpty()
  audio: string;
}

export class ImageObject {
  @IsNotEmpty()
  thumb: string;

  @IsNotEmpty()
  original: string;
}

export class Token {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  userName: string;
}

export class NewStudentToken {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  studentName: string;

  @IsNotEmpty()
  teacherName: string;
}
