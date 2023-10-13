import express from "express";
import { ValidationError, validate } from "class-validator";
import {
  WordData,
  WordsData,
  VocabData,
  CardData,
  YandexAPIDef,
  YandexAPIBody,
  YandexAPITranslation,
} from "../interfaces/interfaces";
import { Card, Word } from "../classes/classes";
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

      readyCards.push(card);
      // sleep between api calls
      const wait = await sleep(3500);
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

const getVocabData = async (word: string) => {
  const res = await fetch(
    `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${process.env.VOCAB_API_KEY}`,
  );
  const data = await res.json();
  return data;
};

const isBodyValid = (req: express.Request, res: express.Response) => {
  // check for empty body
  if (Object.keys(req.body).length === 0) {
    return res.send("No data provided.");
  }

  // check if not array
  if (!Array.isArray(req.body)) {
    return res.send("Provide data in an array of objects using JSON notation.");
  }

  // check for schema
  for (let i = 0; i < req.body.length; i++) {
    if (!req.body[i].word || !req.body[i].part_of_speech) {
      return res.send(
        `Wrong data for word ${req.body[i].word} | part of speech ${req.body[i].part_of_speech}`,
      );
    }
  }
  return true;
};

const getDefinition = (vocabData: VocabData) => {
  return vocabData.meta["app-shortdef"].def;
};

const getSentenceExamples = (vocabData: VocabData) => {
  let array_of_examples: any = [];
  let result: any = [];
  vocabData.def[0].sseq[0][0][1].dt.forEach((item: any) => {
    if (item[0] === "vis") {
      array_of_examples.push(item[1]);
    }
  });
  let counter = 0;
  array_of_examples.forEach((arr: any) => {
    arr.forEach((item: any) => {
      if (counter < 6) {
        result.push(item.t);
      }
      counter += 1;
    });
  });
  return result;
};

const processWords = (words: WordData[], res: express.Response) => {
  const readyCards: CardData[] = [];
  let flag = false;
  let error = "";

  words.every(async (wordData) => {
    // get data from APIs
    const vocabData = await getVocabData(wordData.word);
    if (!vocabData[0].meta) {
      flag = true;
      error = `Could not get vocabData for ${wordData.word}`;
      return false;
    } else {
      const definition = getDefinition(vocabData[0]);
      const examples = getSentenceExamples(vocabData[0]);
      console.log(examples);
    }
    if (flag) {
      return error;
    }

    // create card
    /*
    const card: CardData = {
      word: wordData.word,
      teacher_id: 1,
      student_id: 1,
      part_of_speech: wordData.part_of_speech,
      part_of_speech_ru: wordData.part_of_speech_ru,
      definition: getDefinition(vocabData),
    };
    * */
  });

  return readyCards;
};
