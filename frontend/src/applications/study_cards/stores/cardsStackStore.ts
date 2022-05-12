import { ICardFromDB, ICardsStack } from "../types";
import { action, makeObservable, observable } from "mobx";

class CardsStackStore implements ICardsStack {
  items: any[] = [];
  currNum = 1;
  isLoaded = false;
  isLoading = true;

  constructor() {
    makeObservable(this, {
      items: observable,
      currNum: observable,
      isLoaded: observable,
      isLoading: observable,
      setItems: action.bound,
      fetch: action.bound,
      getCurrent: action.bound,
      next: action.bound,
      insert: action.bound,
    });
  }

  private get(idx: number): ICardFromDB {
    return this?.items[idx];
  }

  getCurrent(): ICardFromDB {
    return this.get(this.currNum - 1);
  }

  setItems(data: ICardFromDB[]): void {
    this.items = data;
    this.isLoaded = true;
    this.isLoading = false;
  }

  fetch() {
    let headers = { "Content-Type": "application/json" };
    return fetch("http://localhost:8000/api/cards/stack", {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        this.setItems(data);
      });
  }

  next(): void {
    console.log("here! currNum is = ", this.currNum);
    this.currNum += 1;
    console.log(this.currNum);
  }

  insert(idx: number, card: ICardFromDB): void {
    this.items.splice(idx, 0, card);
  }
}

const instance = new CardsStackStore();

export default instance;
