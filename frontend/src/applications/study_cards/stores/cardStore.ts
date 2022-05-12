import { action, autorun, computed, makeObservable, observable } from "mobx";
import { DescriptionType, ICard, ICardFromDB } from "../types";

export class CardStore implements ICard {
  id = 1;
  descriptionType = 0;
  prefix = ["This", "is", "my", "test", "message."];
  suffix = ["-", "is", "the", "correct", "answer"];
  answer = "ANSWER";
  answerType = "noun";
  category = "common";
  answerExplanation = "There will be an answer description ";
  phraseTranslation = "Это моё тестовое сообщение. ОТВЕТ - правильный ответ";
  answerTranslation = ["ОТВЕТ"];

  constructor() {
    makeObservable(this, {
      id: observable,
      descriptionType: observable,
      prefix: observable,
      suffix: observable,
      answer: observable,
      category: observable,
      answerExplanation: observable,
      phraseTranslation: observable,
      answerTranslation: observable,
      setCardData: action.bound,
      switchDescriptionType: action.bound,
    });
    autorun(this.logStoreDetails);
  }

  get storeDetails() {
    return `Correct answer is: ${this.answer} ! ${this.descriptionType}`;
  }

  logStoreDetails = () => {
    console.log(this.storeDetails);
  };

  setCardData(data: ICardFromDB) {
    console.log(data);
    this.id = data.id;
    this.prefix = data.prefix.split(" ");
    this.suffix = data.suffix.split(" ");
    this.phraseTranslation = data.phrase_translation;
    this.answer = data.word;
    this.answerExplanation = data.explanation;
    this.category = data.category;
    this.answerTranslation = data.word_translation;
  }

  getPhrase(): string {
    return this.prefix.join(" ") + ` ${this.answer} ` + this.suffix.join(" ");
  }

  switchDescriptionType(): void {
    this.descriptionType = this.descriptionType === 0 ? 1 : 0;
  }
}

const instance = new CardStore();

export default instance;
