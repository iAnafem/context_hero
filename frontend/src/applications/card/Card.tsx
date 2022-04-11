import React, { useState } from "react";
import "./card.css";
// @ts-ignore
import { useSpeechSynthesis } from "react-speech-kit";
import store from "./store";
import Switcher from "../../lib/components/switcher/Switcher";
import Input from "./input/Input";

export const Card = () => {
  const { speak } = useSpeechSynthesis();
  return (
    <div className={"card"}>
      <div className={"phrase"}>
        {store.prefix.map((word: string, idx: number) => (
          <span className={"word"} key={`${word}_${idx}`}>
            {word}
          </span>
        ))}
        <Input store={store} speak={speak} />
        {store.suffix.map((word: string, idx: number) => (
          <span className={"word"} key={`${word}_${idx}`}>
            {word}
          </span>
        ))}
      </div>
      <div>
        <Switcher handleChange={console.log} />
      </div>
      <div className={"description"}>
        {store.descriptionType === 1 ? (
          <div>{store.answerTranslation}</div>
        ) : (
          <div>{store.answerExplanation}</div>
        )}
        <div>{store.phraseTranslation}</div>
      </div>
    </div>
  );
};
