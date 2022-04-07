import React, { useState } from "react";
// @ts-ignore
import { useSpeechSynthesis } from "react-speech-kit";
import store from "./store";

export const Card = () => {
  const [answer, setAnswer] = useState("");
  const { speak } = useSpeechSynthesis();
  const handleKeyDown = (key: string) => {
    if (key === "Enter") {
      if (answer.toLowerCase() === store.correctAns.toLowerCase()) {
        setAnswer(store.correctAns);
      } else {
        speak({ text: store.correctAns });
        setAnswer("");
      }
    }
  };
  return (
    <div>
      {store.prefix.map((word: string, idx: number) => (
        <p key={`${word}_${idx}`}>{word}</p>
      ))}
      <input
        autoFocus
        type={"string"}
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        onKeyDown={(event) => handleKeyDown(event.key)}
      />
      {store.suffix.map((word: string, idx: number) => (
        <p key={`${word}_${idx}`}>{word}</p>
      ))}
    </div>
  );
};
