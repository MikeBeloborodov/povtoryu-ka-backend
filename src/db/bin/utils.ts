import { writeFile, readFile, existsSync, mkdirSync } from "fs";
import { promisify } from "util";
import { addDays } from "../../bin/utils";
import { FileSavingError } from "../../classes/Errors";

const writeFileAsync = promisify(writeFile);
const readFileAsync = promisify(readFile);

export const calculateNextReview = (isCorrect: Boolean, card: any) => {
  const currDate = new Date();
  if (isCorrect) {
    if (card.newCard) {
      card.newCard = false;
      card.nextReview = addDays(currDate, 0);
    } else {
      card.streak += 1;
      card.nextReview = addDays(currDate, Math.pow(2, card.streak));
    }
  } else {
    card.streak = -1;
    card.nextReview = addDays(currDate, 0);
  }
  return card;
};

export const saveAudioFile = async (file: any, path: string) => {
  try {
    if (!existsSync("./audio")) mkdirSync("./audio");
    const localFile = await readFileAsync(file.path);
    await writeFileAsync(path, localFile);
  } catch (error) {
    console.log(error);
    throw new FileSavingError();
  }
};
