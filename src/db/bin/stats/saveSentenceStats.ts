import { SentenceStat } from "../../ormModels/SentenceStat";
import { DBError } from "../../../classes/Errors";

export const saveSentenceStats = async (
  cardId: number,
  studentId: number,
  word: string,
  answer: string,
  correctAnswer: string,
  isCorrect: Boolean,
) => {
  try {
    const stat = SentenceStat.build({
      cardId,
      studentId,
      word,
      answer,
      correctAnswer,
      isCorrect,
    });
    await stat.save();
  } catch (error) {
    throw new DBError();
  }
};
