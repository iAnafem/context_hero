import { action, autorun, computed, makeObservable, observable } from "mobx";
import { DescriptionType } from "./types";

export class CardStore {
  id: number = 1;
  descriptionType: DescriptionType = 0;
  prefix: string[] = ["This", "is", "my", "test", "message."];
  suffix: string[] = ["-", "is", "the", "correct", "answer"];
  answer: string = "ANSWER";
  answerExplanation: string = "There will be an answer description ";
  phraseTranslation: string = "The whole sentence translation";
  answerTranslation: string = "An answer translation";

  constructor() {
    makeObservable(this, {
      id: observable,
      descriptionType: observable,
      prefix: observable,
      suffix: observable,
      answer: observable,
      answerExplanation: observable,
      phraseTranslation: observable,
      answerTranslation: observable,
      fetch: action.bound,
      setPhraseData: action.bound,
      getPhrase: action.bound,
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

  setPhraseData(data: any) {
    this.prefix = data.prefix;
    this.suffix = data.suffix;
    this.answer = data.answer;
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
