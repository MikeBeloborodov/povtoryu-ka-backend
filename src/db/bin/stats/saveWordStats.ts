import { WordStat } from "../../ormModels/WordStat";
import { DBError } from "../../../classes/Errors";

export const saveWordStats = async (
  cardId: number,
  studentId: number,
  word: string,
  answer: string,
  isCorrect: Boolean,
) => {
  try {
    const stat = WordStat.build({
      cardId,
      studentId,
      word,
      answer,
      isCorrect,
    });
    await stat.save();
  } catch (error) {
    throw new DBError();
  }
};
