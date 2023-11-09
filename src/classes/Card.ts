import { IsNotEmpty } from "class-validator";
import { NewWordCardRequestBody } from "../interfaces/Card";

export class NewWordCardClass {
  @IsNotEmpty()
  partOfSpeech: string;

  @IsNotEmpty()
  word: string;

  @IsNotEmpty()
  definition: string;

  @IsNotEmpty()
  translations: string[];

  @IsNotEmpty()
  sentences: string[];

  @IsNotEmpty()
  images: string[];

  @IsNotEmpty()
  studentId: number;

  constructor({
    partOfSpeech,
    sentences,
    images,
    translations,
    definition,
    word,
    studentId,
  }: NewWordCardRequestBody) {
    this.partOfSpeech = partOfSpeech;
    this.word = word;
    this.studentId = studentId;
    this.sentences = sentences;
    this.images = images;
    this.translations = translations;
    this.definition = definition;
  }
}
