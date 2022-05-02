import { action, autorun, computed, makeObservable, observable } from "mobx";
import { DescriptionType } from "./types";

export class CardStore {
  id: number = 1;
  descriptionType: DescriptionType = 0;
  prefix: string[] = ["This", "is", "my", "test", "message."];
  suffix: string[] = ["-", "is", "the", "correct", "answer"];
  answer: string = "ANSWER";
  answerType: string = "noun";
  category: string = "common";
  answerExplanation: string = "There will be an answer description ";
  phraseTranslation: string =
    "Это моё тестовое сообщение. ОТВЕТ - правильный ответ";
  answerTranslation: string[] = ["ОТВЕТ"];

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
      fetch: action.bound,
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

  fetch(url: string, handler: Function) {
    let headers = { "Content-Type": "application/json" };
    return fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        handler(data);
      });
  }

  setCardData(data: any) {
    data = data[0];
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
