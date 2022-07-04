import React, { useState } from "react";
import "./index.css";
import cardStore from "../../stores/cardStore";
import { TInput } from "../../types";
import stackStore from "../../stores/cardsStackStore";
// @ts-ignore
import { useSpeechSynthesis } from "react-speech-kit";
import cardsStackStore from "../../stores/cardsStackStore";

function getRandomInt(max: number, min: number): number {
  return Math.floor(Math.random() * max) + min;
}

export default function Input(props: TInput) {
  const initTextColor = "#22596e";
  const initBGColor = "#edf7f7";
  const initWidth = Math.ceil(cardStore.answer.length);
  const [answer, setAnswer] = useState("");
  const [textColor, setTextColor] = useState(initTextColor);
  const [BGColor, setBGColor] = useState(initBGColor);
  const [width, setWidth] = useState(initWidth);
  const [placeholder, setPlaceholder] = useState("");
  const onEnd = () => {
    stackStore.next();
    setAnswer("");
    setTextColor(initTextColor);
    setBGColor(initBGColor);
    setWidth(initWidth / 2);
  };
  const correctAnswerSpeech = useSpeechSynthesis({ onEnd });
  const incorrectAnswerSpeech = useSpeechSynthesis();
  const isAnswerCorrect = (answer: string) =>
    answer.toLowerCase() === props.store.answer.toLowerCase();
  const handleKeyDown = (key: string) => {
    if (key === "Enter") {
      if (isAnswerCorrect(answer)) {
        setTextColor("rgb(73 120 79)");
        setBGColor("rgb(232 255 233)");
        setAnswer(cardStore.answer);
        cardStore.updateGrade(1);
        cardsStackStore.withSound
          ? correctAnswerSpeech.speak({
              text: props.store.getPhrase(),
            } as SpeechSynthesisUtterance)
          : setTimeout(() => {
              onEnd();
            }, 1500);
      } else {
        cardsStackStore.withSound &&
          incorrectAnswerSpeech.speak({
            text: props.store.answer,
          } as SpeechSynthesisUtterance);
        setAnswer("");
        setWidth(initWidth);
        setBGColor("rgb(255 231 231)");
        setPlaceholder(props.store.answer);
        cardStore.updateGrade(-1);
        setTimeout(() => {
          setPlaceholder("");
          setWidth(initWidth / 2);
          setBGColor(initBGColor);
        }, 2000);
      }
      let currIdx = cardsStackStore.currNum - 1;
      let minDistance = 10;
      let idxToInsert = Math.min(
        getRandomInt(cardsStackStore.items.length, currIdx + minDistance)
      );
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
        color: textColor,
        backgroundColor: BGColor,
        width: width * 11,
        minWidth: (initWidth / 2) * 11,
      }}
    />
  );
}
