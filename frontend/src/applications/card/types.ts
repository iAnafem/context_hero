import { CardStore } from "./store";
// @ts-ignore
import { useSpeechSynthesis } from "react-speech-kit";
import store from "./store";
import Switcher from "../../lib/components/switcher/Switcher";
import Input from "./input/Input";

export enum DescriptionType {
  "Explanation" = 0,
  "Translation" = 1,
}

export type TInput = {
  store: CardStore;
  speak: useSpeechSynthesis;
};
