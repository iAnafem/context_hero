import { CardStore } from "./stores/cardStore";
// @ts-ignore
import { useSpeechSynthesis } from "react-speech-kit";

export interface ICard {
  id: number;
  descriptionType: DescriptionType;
  prefix: string[];
  suffix: string[];
  answer: string;
  answer_id: number;
  grade: number;
  answerType: string;
  category: string;
  answerExplanation: string;
  phraseTranslation: string;
  answerTranslation: string[];
  incorrectAnswersQty: number;
}

export interface ICardFromDB {
  id: number;
  person_id: number;
  prefix: string;
  suffix: string;
  phrase_translation: string;
  word: string;
  word_id: number;
  grade: number;
  explanation: string;
  category: string;
  word_translation: string[];
}

export interface ICardsStack {
  items: ICardFromDB[] | object[];
  currNum: number;
  isLoading: boolean;
  isLoaded: boolean;
  withSound: boolean;
}

export enum DescriptionType {
  "Explanation" = 0,
  "Translation" = 1,
}

export type TInput = {
  store: CardStore;
};
