export interface IPhraseToCreate {
  phrase: string;
  wordsToLearn: number[];
}

export interface ICreateCard {
  phrases?: IPhraseToCreate[];
}
