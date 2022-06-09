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
  let initWidth = Math.ceil(cardStore.answer.length);
  const [width, setWidth] = useState(initWidth);
  const [placeholder, setPlaceholder] = useState("");
  const onEnd = () => {
    stackStore.next();
    setAnswer("");
    setColor("grey");
    setWidth(initWidth / 2);
  };
  const correctAnswerSpeech = useSpeechSynthesis({ onEnd });
  const incorrectAnswerSpeech = useSpeechSynthesis();
  const isAnswerCorrect = (answer: string) =>
    answer.toLowerCase() === props.store.answer.toLowerCase();
  const handleKeyDown = (key: string) => {
    let grade = 0;
    if (key === "Enter") {
      if (isAnswerCorrect(answer)) {
        setColor("green");
        setAnswer(cardStore.answer);
        grade = 1;
        correctAnswerSpeech.speak({
          text: props.store.getPhrase(),
        } as SpeechSynthesisUtterance);
      } else {
        incorrectAnswerSpeech.speak({
          text: props.store.answer,
        } as SpeechSynthesisUtterance);
        setAnswer("");
        setWidth(initWidth);
        setPlaceholder(props.store.answer);
        setTimeout(() => {
          setPlaceholder("");
          setWidth(initWidth / 2);
        }, 2000);
        grade = -1;
      }
      cardStore.updateGrade(grade);
      let currIdx = cardsStackStore.currNum - 1;
      let minDistance = 10;
      let idxToInsert = Math.min(
        getRandomInt(cardsStackStore.items.length, currIdx + minDistance)
      );
      cardStore.updIncorrectAnswersQty();
      cardStore.incorrectAnswersQty === 1 &&
        cardsStackStore.insert(idxToInsert, cardsStackStore.getCurrent());
    } else {
      if (answer.length >= width) {
        let value = key === "Backspace" && width > 0 ? -1 : 1;
        setWidth(width + value);
      }
    }
  };
  return (
    <input
      autoFocus
      type={"text"}
      className={"input"}
      value={answer}
      placeholder={placeholder}
      onChange={(event) => setAnswer(event.target.value)}
      onKeyDown={(event) => handleKeyDown(event.key)}
      style={{
        color: color,
        width: width * 11,
        minWidth: (initWidth / 2) * 11,
      }}
    />
  );
}
