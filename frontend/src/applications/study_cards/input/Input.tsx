import React, { useState } from "react";
import "./input.css";
import cardStore from "../stores/cardStore";
import { TInput } from "../types";
import stackStore from "../stores/cardsStackStore";
// @ts-ignore
import { useSpeechSynthesis } from "react-speech-kit";
import cardsStackStore from "../stores/cardsStackStore";

function getRandomInt(max: number, min: number): number {
  return Math.floor(Math.random() * max) + min;
}

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
    let value = 0;
    if (key === "Enter") {
      if (isAnswerCorrect(answer)) {
        setColor("green");
        setAnswer(cardStore.answer);
        value = 1;
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
        value = -1;
      }
      cardStore.updateGrade(value);
      let currIdx = cardsStackStore.currNum - 1;
      let minDistance = 10;
      let idxToInsert = Math.min(
        getRandomInt(cardsStackStore.items.length, currIdx + minDistance)
      );
      cardStore.updIncorrectAnswersQty();
      cardStore.incorrectAnswersQty === 1 &&
        cardsStackStore.insert(idxToInsert, cardsStackStore.getCurrent());
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
