import { addDays } from "../../bin/utils";

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
