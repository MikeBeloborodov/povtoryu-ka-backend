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

export interface UnsplashAPIBody {
  results: UnsplashAPIResult[];
}

export interface UnsplashAPIResult {
  description: string;
  alt_description: string;
  urls: UnsplashAPIURLs;
}

export interface UnsplashAPIURLs {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface TeacherData {
  userName: string;
  password: string;
}

export interface UserData {
  userName: string;
  password: string;
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

export interface EnglishDictAPIEntry {
  meta: EnglishDictAPIMeta;
  fl: string;
  shortdef: string[];
  def: EnglishDictAPIDef[];
  hwi: EnglishDictAPIHwi;
}

export interface EnglishDictAPIHwi {
  prs: EnglishDictAPIPrs[];
}

export interface EnglishDictAPIPrs {
  sound: EnglishDictAPISound;
}

export interface EnglishDictAPISound {
  audio: string;
}

export interface EnglishDictAPIMeta {
  "app-shortdef": EnglishDictAPIShortdef;
}

export interface EnglishDictAPIShortdef {
  fl: string;
  def: string[];
}

export interface EnglishDictAPIDef {
  sseq: any[];
}
