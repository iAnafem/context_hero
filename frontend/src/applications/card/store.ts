import { action, autorun, computed, makeObservable, observable } from "mobx";

class CardStore {
  prefix: string[] = ["This", "is", "my", "test", "message", "."];
  suffix: string[] = ["-", "is", "the", "correct", "answer"];
  correctAns: string = "ANSWER";
  suggestedAns: string = "";

  constructor() {
    makeObservable(this, {
      prefix: observable,
      suffix: observable,
      correctAns: observable,
      suggestedAns: observable,
      fetch: action.bound,
      setSentenceData: action.bound,
      setAnswer: action.bound,
    });
    autorun(this.logStoreDetails);
  }

  get storeDetails() {
    return `Correct answer is: ${this.correctAns} !`;
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

  setSentenceData(data: any) {
    this.prefix = data.prefix;
    this.suffix = data.suffix;
    this.correctAns = data.correctAns;
  }

  setAnswer(suggestedAns: string) {
    if (suggestedAns === this.correctAns) {
      this.suggestedAns = suggestedAns
    }
  }
}

const instance = new CardStore();

export default instance;
