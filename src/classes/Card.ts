import { IsNotEmpty } from "class-validator";
import {
  AnswerWordCardRequestBody,
  AnswerSentenceCardRequestBody,
  NewWordCardRequestBody,
} from "../interfaces/Card";

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

export class NewSentenceCardClass {
  @IsNotEmpty()
  sentence: string;

  @IsNotEmpty()
  word: string;

  @IsNotEmpty()
  answer: string;

  sentenceTranslation: string;

  @IsNotEmpty()
  definition: string;

  audio: Blob;

  @IsNotEmpty()
  pos: string;

  @IsNotEmpty()
  studentId: number;

  image: string;
}

export class AnswerWordCardClass {
  @IsNotEmpty()
  cardId: number;

  @IsNotEmpty()
  answer: string;

  constructor({ cardId, answer }: AnswerWordCardRequestBody) {
    this.cardId = cardId;
    this.answer = answer;
  }
}

export class AnswerSentenceCardClass {
  @IsNotEmpty()
  cardId: number;

  @IsNotEmpty()
  answer: string;

  constructor({ cardId, answer }: AnswerSentenceCardRequestBody) {
    this.cardId = cardId;
    this.answer = answer;
  }
}
