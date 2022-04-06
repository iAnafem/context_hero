import React from "react";
// @ts-ignore
import { useSpeechSynthesis } from "react-speech-kit";
import instance from "./store";

export const Card = () => {
  const store = instance;
  const { speak } = useSpeechSynthesis();
  return (
    <div>
      {store.prefix.map((word: string) => (
        <p>{word}</p>
      ))}
      <p>{store.correctAns}</p>
      {store.suffix.map((word: string) => (
        <p>{word}</p>
      ))}
    </div>
  );
};
