import { ICreateCard } from "../types";
import { action, autorun, makeObservable, observable } from "mobx";

class CreateCardStore implements ICreateCard {
  phrase: string = "";
  wordsToLearn: number[] = [];

  constructor() {
    makeObservable(this, {
      phrase: observable,
      wordsToLearn: observable,
      setPhrase: action.bound,
      addWord: action.bound,
    });
    autorun(this.logStoreDetails);
  }
  get storeDetails() {
    return this.wordsToLearn;
  }
  logStoreDetails = () => {
    console.log(this.storeDetails);
  };

  setPhrase(phrase: string): void {
    this.phrase = phrase;
  }

  addWord(idx: number): void {
    if (idx in this.wordsToLearn) {
      this.wordsToLearn.splice(this.wordsToLearn.indexOf(idx), 1);
    } else {
      this.wordsToLearn.push(idx);
    }
  }
}

const instance = new CreateCardStore();

export default instance;
