import React, { useState } from "react";
import "./input.css";
import store from "../store";
import { TInput } from "../types";

export default function Input(props: TInput) {
  const [answer, setAnswer] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const handleKeyDown = (key: string) => {
    if (key === "Enter") {
      if (answer.toLowerCase() === props.store.answer.toLowerCase()) {
        setAnswer(store.answer);
        props.speak({
          text: props.store.getPhrase(),
        } as SpeechSynthesisUtterance);
      } else {
        props.speak({ text: props.store.answer } as SpeechSynthesisUtterance);
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
      value={answer}
      placeholder={placeholder}
      onChange={(event) => setAnswer(event.target.value)}
      onKeyDown={(event) => handleKeyDown(event.key)}
    />
  );
}
