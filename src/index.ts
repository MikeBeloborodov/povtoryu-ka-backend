import express from "express";
import parser from "body-parser";
import bodyParserErrorhandler from "express-body-parser-error-handler";
import bodyParserErrorHandler from "express-body-parser-error-handler";

interface WordData {
  word: string;
  part_of_speech: string;
  part_of_speech_ru: string;
  category: string;
  theme: string;
  teacher_id: number;
  student_id: number;
}

interface CardData {
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

interface ImageObject {
  thumb: string;
  original: string;
}

interface VocabData {
  meta: VocabMetaData;
  def: VocabDefData[];
}

interface VocabMetaData {
  "app-shortdef": VocabShortDef;
}

interface VocabShortDef {
  hw: string;
  fl: string;
  def: string[];
}

interface VocabDefData {
  sseq: any[];
}

interface VocabSentence {
  t: string;
}

require("dotenv").config();

const app = express();
const port = 8080;

const jsonParser = parser.json();

app.use(jsonParser);
app.use(bodyParserErrorHandler());

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

app.post(
  "/api/v1/words",
  async (req: express.Request, res: express.Response) => {
    if (!isBodyValid(req, res)) return;

    const words: WordData[] = req.body;

    const result = processWords(words, res);
    if (!result) {
      res.send;
    }

    //const data = await getVocabData("sheep");

    return res.send(req.body);
  },
);

app.listen(port, () => {
  console.log("Server is running on http://localhost:8080");
});
