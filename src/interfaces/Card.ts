export interface NewCardRequestBody {
  category: string;
  theme: string;
  partOfSpeech: string;
  word: string;
  teacherId: number;
  studentId: number;
}

export interface NewWordCardRequestBody {
  partOfSpeech: string;
  word: string;
  definition: string;
  images: string[];
  sentences: string[];
  translations: string[];
  studentId: number;
}

export interface NewSentenceCardRequestBody {
  sentence: string;
  word: string;
  answer: string;
  sentenceTranslation: string;
  definition: string;
  audio: Blob;
  pos: string;
  image: string;
  studentId: number;
}

export interface AnswerWordCardRequestBody {
  cardId: number;
  answer: string;
}

export interface AnswerSentenceCardRequestBody {
  cardId: number;
  answer: string;
}
