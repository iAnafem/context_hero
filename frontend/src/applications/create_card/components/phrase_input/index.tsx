import React, { useState } from "react";
import { observer } from "mobx-react";
import ccStore from "../../stores/createCardStore";
import "./index.css";

interface IPhraseInput {
  initPhrase?: string;
  idx?: number;
  className?: string;
}

const PhraseInput = observer((props: IPhraseInput) => {
  const [phrase, setPhrase] = useState(
    props.initPhrase === undefined ? "" : props.initPhrase
  );
  const handleKeyDown = (key: string) => {
    if (key === "Enter") {
      ccStore.insertPhrase(phrase, props.idx);
      setPhrase("");
    } else if (key === "Escape") {
      setPhrase("");
    }
  };

  return (
    <input
      className={props.className || "baseInput"}
      onKeyDown={(event) => handleKeyDown(event.key)}
      onChange={(event) => setPhrase(event.target.value)}
      value={phrase}
      autoFocus={true}
    />
  );
});

export default PhraseInput;
