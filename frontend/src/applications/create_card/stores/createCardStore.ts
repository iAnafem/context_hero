import { ICreateCard, IPhraseToCreate } from "../types";
import { action, autorun, makeObservable, observable } from "mobx";

class CreateCardStore implements ICreateCard {
  phrases: IPhraseToCreate[] = [];

  constructor() {
    makeObservable(this, {
      phrases: observable,
      insertPhrase: action.bound,
      // addWord: action.bound,
    });
    autorun(this.logStoreDetails);
  }
  get storeDetails() {
    return this.phrases;
  }
  logStoreDetails = () => {
    console.log("Print phrases");
    this.storeDetails.map((item: IPhraseToCreate) => console.log(item.phrase));
  };

  insertPhrase(phrase: string, idx?: number): void {
    const phraseToCreate = { phrase: phrase, wordsToLearn: [] };
    idx === undefined
      ? this.phrases.push(phraseToCreate)
      : this.phrases.splice(idx, 1, phraseToCreate);
  }

  removePhrase(idx: number): void {
    this.phrases.splice(idx, 1);
  }

  // addWord(idx: number): void {
  //   if (idx in this.wordsToLearn) {
  //     this.wordsToLearn.splice(this.wordsToLearn.indexOf(idx), 1);
  //   } else {
  //     this.wordsToLearn.push(idx);
  //   }
  // }
}

const instance = new CreateCardStore();

export default instance;
