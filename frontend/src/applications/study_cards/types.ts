import { CardStore } from "./stores/cardStore";
// @ts-ignore
import { useSpeechSynthesis } from "react-speech-kit";
import store from "./stores/cardStore";
import Switcher from "../../lib/components/switcher/Switcher";
import Input from "./input/Input";

export interface ICard {
  id: number;
  descriptionType: DescriptionType;
  prefix: string[];
  suffix: string[];
  answer: string;
  answerType: string;
  category: string;
  answerExplanation: string;
  phraseTranslation: string;
  answerTranslation: string[];
}

export interface ICardsStack {
  items?: object[];
  currNum: number;
  isLoading: boolean;
  isLoaded: boolean;
}

export enum DescriptionType {
  "Explanation" = 0,
  "Translation" = 1,
}

export type TInput = {
  store: CardStore;
  speak: useSpeechSynthesis;
};
