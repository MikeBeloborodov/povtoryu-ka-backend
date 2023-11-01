import { IsNotEmpty } from "class-validator";
import { NewCardRequestBody } from "../interfaces/Card";

export class NewCardInfo {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  theme: string;

  @IsNotEmpty()
  partOfSpeech: string;

  @IsNotEmpty()
  word: string;

  @IsNotEmpty()
  teacherId: number;

  @IsNotEmpty()
  studentId: number;

  constructor({
    category,
    theme,
    partOfSpeech,
    word,
    teacherId,
    studentId,
  }: NewCardRequestBody) {
    this.category = category;
    this.partOfSpeech = partOfSpeech;
    this.theme = theme;
    this.word = word;
    this.teacherId = teacherId;
    this.studentId = studentId;
  }
}
