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
