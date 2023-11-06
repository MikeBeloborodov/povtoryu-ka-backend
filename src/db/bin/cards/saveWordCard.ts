import express from "express";
import { WordCard } from "../../ormModels/WordCard";
import { NewWordCardRequestBody } from "../../../interfaces/Card";
import { Sentence } from "../../ormModels/Sentence";
import { DBError } from "../../../classes/Errors";
import { Translation } from "../../ormModels/Translation";
import { Image } from "../../ormModels/Image";

export const saveWordCard = async (req: express.Request) => {
  const requestBody = req.body as NewWordCardRequestBody;
  try {
    let partOfSpeechRu;
    switch (requestBody.partOfSpeech) {
      case "noun":
        partOfSpeechRu = "существительное";
        break;
      case "verb":
        partOfSpeechRu = "глагол";
        break;
      case "adjective":
        partOfSpeechRu = "прилагательное";
        break;
    }
    const card = WordCard.build({
      word: requestBody.word,
      partOfSpeech: requestBody.partOfSpeech,
      partOfSpeechRu: partOfSpeechRu,
      definition: requestBody.definition,
      newCard: true,
      teacherId: requestBody.teacherId,
      studentId: requestBody.studentId,
    });
    const cardRes: any = await card.save();
    // save sentences
    for (let i = 0; i < requestBody.sentences.length; i++) {
      const sentence = Sentence.build({
        sentence: requestBody.sentences[i],
        cardId: cardRes.id,
      });
      await sentence.save();
    }
    // save translations
    for (let i = 0; i < requestBody.translations.length; i++) {
      const translation = Translation.build({
        translation: requestBody.translations[i],
        cardId: cardRes.id,
      });
      await translation.save();
    }
    // save images
    for (let i = 0; i < requestBody.images.length; i++) {
      const image = Image.build({
        url: requestBody.images[0],
        cardId: cardRes.id,
      });
      await image.save();
    }
    return cardRes;
  } catch (error) {
    throw new DBError();
  }
};
