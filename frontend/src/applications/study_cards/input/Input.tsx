import React, { useState } from "react";
import "./input.css";
import cardStore from "../stores/cardStore";
import { TInput } from "../types";
import stackStore from "../stores/cardsStackStore";
// @ts-ignore
import { useSpeechSynthesis } from "react-speech-kit";

export default function Input(props: TInput) {
  const [answer, setAnswer] = useState("");
  const [color, setColor] = useState("grey");
  const [placeholder, setPlaceholder] = useState("");
  const onEnd = () => {
    stackStore.next();
    setAnswer("");
    setColor("grey");
  };
  const correctAnswerSpeech = useSpeechSynthesis({ onEnd });
  const incorrectAnswerSpeech = useSpeechSynthesis();
  const isAnswerCorrect = (answer: string) =>
    answer.toLowerCase() === props.store.answer.toLowerCase();
  const handleKeyDown = (key: string) => {
    if (key === "Enter") {
      if (isAnswerCorrect(answer)) {
        setColor("green");
        setAnswer(cardStore.answer);
        correctAnswerSpeech.speak({
          text: props.store.getPhrase(),
        } as SpeechSynthesisUtterance);
      } else {
        incorrectAnswerSpeech.speak({
          text: props.store.answer,
        } as SpeechSynthesisUtterance);
        setAnswer("");
        setPlaceholder(props.store.answer);
        setTimeout(() => setPlaceholder(""), 2000);
      }
    }
  };
  return (
    <input
      autoFocus
      type={"string"}
      className={"placeholder"}
      value={answer}
      placeholder={placeholder}
      onChange={(event) => setAnswer(event.target.value)}
      onKeyDown={(event) => handleKeyDown(event.key)}
      style={{ color: color }}
    />
  );
}
