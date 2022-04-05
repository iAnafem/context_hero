import React from "react";
// @ts-ignore
import { useSpeechSynthesis } from "react-speech-kit";

export const LearnCard = () => {
  const [value, setValue] = React.useState("");
  const { speak } = useSpeechSynthesis();
  return (
    <div className="speech">
      <div className="group">
        <h2>Text To Speech Converter Using React Js</h2>
      </div>
      <textarea value={value} onChange={(e) => setValue(e.target.value)}>
        {" "}
      </textarea>
      <div className="group">
        <button onClick={() => speak({ text: value })}>Speech</button>
      </div>
    </div>
  );
};
