import { ValidationError, validate } from "class-validator";
import {
  WordsData,
  YandexAPIBody,
  UnsplashAPIBody,
  EnglishDictAPIEntry,
  UserData,
} from "../interfaces/interfaces";
import { Card, ImageObject, Word } from "../classes/classes";
import { sleep } from "./utils";

require("dotenv").config();

export const createWordObjects = async (data: WordsData) => {
  const errorsArray: ValidationError[][] = [];
  const checkedWords: Word[] = [];
  for (const item of data.words) {
    const word = new Word();
    word.studentId = item.studentId;
    word.category = item.category;
    word.theme = item.theme;
    word.teacherId = item.teacherId;
    word.word = item.word;
    word.partOfSpeech = item.partOfSpeech;
    word.partOfSpeechRu = item.partOfSpeechRu;
    const errors = await validate(word);
    if (errors.length > 0) {
      errorsArray.push(errors);
    } else {
      checkedWords.push(word);
    }
  }
  return [errorsArray, checkedWords];
};

const getTranslations = async (word: string, partOfSpeech: string) => {
  const searchURL = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${process.env.YANDEX_API_KEY}&lang=en-ru&text=${word}`;
  const translations: string[] = [];
  const res = await fetch(searchURL);
  const data: YandexAPIBody = await res.json();
  for (let item of data.def) {
    if (item.pos === partOfSpeech) {
      for (let translation of item.tr) {
        translations.push(translation.text);
      }
    }
  }
  return translations;
};

const getImages = async (word: string) => {
  const apiURL = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${word}`;
  const images: ImageObject[] = [];
  const res = await fetch(apiURL);
  const data: UnsplashAPIBody = await res.json();
  for (let i = 0; i < 10 && i < data.results.length; i++) {
    const originalImg = data.results[i].urls.regular;
    const thumbImg = data.results[i].urls.small;
    images.push({ original: originalImg, thumb: thumbImg });
  }
  return images;
};

const getDefinitionSentencesAudio = async (
  word: string,
  partOfSpeech: string,
) => {
  const apiURL = `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${process.env.VOCAB_API_KEY}`;
  const res = await fetch(apiURL);
  const data: EnglishDictAPIEntry[] = await res.json();

  // filter entries by part of speech
  const filteredEntries = data.filter((entry) => {
    if (entry.fl == partOfSpeech) return true;
    return false;
  });

  let definition: string;
  for (let item of filteredEntries[0].def[0].sseq[0]) {
    if (item[0] === "sense") {
      for (let def of item[1].dt) {
        if (def[0] === "text") {
          definition = def[1].replace(/{[^}]*}/g, "");
          break;
        }
      }
      break;
    }
  }

  let audio: string = filteredEntries[0].hwi.prs[0].sound.audio;
  const audioTemplate = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${audio[0]}/${audio}.mp3`;

  let sentences: string[] = [];
  for (let item of filteredEntries[0].def[0].sseq[0]) {
    if (item[0] === "sense") {
      for (let def of item[1].dt) {
        if (def[0] === "vis") {
          for (let sentence of def[1]) {
            sentences.push(sentence.t.replace(/{[^}]*}/g, ""));
          }
          break;
        }
      }
    }
  }

  return [definition, sentences, audioTemplate];
};

export const createCardObjects = async (checkedWords: Word[]) => {
  const readyCards: Card[] = [];
  const errors: string[] = [];
  const validationErrors: ValidationError[][] = [];
  try {
    for (let item of checkedWords) {
      const card = new Card();
      card.word = item.word;
      card.theme = item.theme;
      card.category = item.category;
      card.studentId = item.studentId;
      card.teacherId = item.teacherId;
      card.partOfSpeech = item.partOfSpeech;
      card.partOfSpeechRu = item.partOfSpeechRu;
      card.newCard = true;
      card.translation = await getTranslations(item.word, item.partOfSpeech);
      card.images = await getImages(item.word);
      const [definition, sentences, audio] = await getDefinitionSentencesAudio(
        item.word,
        item.partOfSpeech,
      );
      card.definition = definition as string;
      card.sentences = sentences as string[];
      card.audio = audio as string;

      readyCards.push(card);
      // sleep between api calls
      await sleep(500);
    }
    for (let card of readyCards) {
      const validationError = await validate(card);
      if (validationError.length > 0) {
        validationErrors.push(validationError);
      }
    }
  } catch (error) {
    errors.push(error);
  }

  return [readyCards, errors, validationErrors];
};
