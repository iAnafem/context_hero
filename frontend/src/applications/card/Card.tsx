import React, { useState } from "react";
import "./card.css";
// @ts-ignore
import { useSpeechSynthesis } from "react-speech-kit";
import store from "./store";

export const Card = () => {
  const [answer, setAnswer] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const { speak } = useSpeechSynthesis();
  const handleKeyDown = (key: string) => {
    if (key === "Enter") {
      if (answer.toLowerCase() === store.correctAns.toLowerCase()) {
        setAnswer(store.correctAns);
        speak({ text: store.getSentence() });
      } else {
        speak({ text: store.correctAns });
        setAnswer("");
        setPlaceholder(store.correctAns);
        setTimeout(() => setPlaceholder(""), 2000);
      }
    }
  };
  return (
    <div className={"card"}>
      <div className={"phrase"}>
        {store.prefix.map((word: string, idx: number) => (
          <span className={"word"} key={`${word}_${idx}`}>
            {word}
          </span>
        ))}
        <input
          autoFocus
          type={"string"}
          value={answer}
          placeholder={placeholder}
          onChange={(event) => setAnswer(event.target.value)}
          onKeyDown={(event) => handleKeyDown(event.key)}
        />
        {store.suffix.map((word: string, idx: number) => (
          <span className={"word"} key={`${word}_${idx}`}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};
