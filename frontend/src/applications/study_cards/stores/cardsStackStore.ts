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
      fetch: action.bound,
      getCurrent: action.bound,
      next: action.bound,
      insert: action.bound,
    });
  }

  private get(idx: number): ICardFromDB {
    return this?.items[idx];
  }

  getCurrent(): object {
    return this.get(this.currNum - 1);
  }

  private setItems(data: ICardFromDB[]): void {
    this.items = data;
  }

  fetch() {
    let headers = { "Content-Type": "application/json" };
    return fetch("http://localhost:8000/api/cards/list", {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        this.setItems(data);
      });
  }

  next(): object {
    return this.get(this.currNum);
  }

  insert(idx: number, data: ICardFromDB): void {
    this.items.splice(idx, 0, data);
  }
}

const instance = new CardsStackStore();

export default instance;
