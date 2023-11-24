import { Stat } from "../../ormModels/Stat";
import { DBError } from "../../../classes/Errors";

export const saveStats = async (
  cardId: number,
  studentId: number,
  word: string,
  answer: string,
  isCorrect: Boolean,
) => {
  try {
    const stat = Stat.build({
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
