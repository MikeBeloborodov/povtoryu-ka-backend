export interface YandexAPIBody {
  def: YandexAPIDef[];
}

export interface YandexAPIDef {
  pos: string;
  tr: YandexAPITranslation[];
}

export interface YandexAPITranslation {
  text: string;
}

export interface WordsData {
  words: WordData[];
}

export interface WordData {
  word: string;
  partOfSpeech: string;
  partOfSpeechRu: string;
  category: string;
  theme: string;
  teacherId: number;
  studentId: number;
}

export interface CardData {
  category: string;
  definition: string;
  images: ImageObject[];
  in_context: string[];
  new_card: boolean;
  part_of_speech: string;
  part_of_speech_ru: string;
  theme: string;
  translation: string[];
  word: string;
  teacher_id: number;
  student_id: number;
}

export interface ImageObject {
  thumb: string;
  original: string;
}

export interface VocabData {
  meta: VocabMetaData;
  def: VocabDefData[];
}

export interface VocabMetaData {
  "app-shortdef": VocabShortDef;
}

export interface VocabShortDef {
  hw: string;
  fl: string;
  def: string[];
}

export interface VocabDefData {
  sseq: any[];
}

export interface VocabSentence {
  t: string;
}
