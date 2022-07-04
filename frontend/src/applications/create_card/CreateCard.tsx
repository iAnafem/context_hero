import React, { useState } from "react";
import { observer } from "mobx-react";
import ccStore from "./stores/createCardStore";
import { IPhraseToCreate } from "./types";

const CreateCard = observer(() => {
  const [phrase, setPhrase] = useState("");
  const handleKeyDown = (key: string) => {
    if (key === "Enter") {
      ccStore.insertPhrase(phrase);
      setPhrase("");
    } else if (key === "Escape") {
      setPhrase("");
    }
  };
  return (
    <div>
      <input
        onKeyDown={(event) => handleKeyDown(event.key)}
        onChange={(event) => setPhrase(event.target.value)}
        value={phrase}
      />
      {ccStore.phrases.map((item: IPhraseToCreate, idx: number) => (
        <div key={`phrase_${idx}`}>{item.phrase}</div>
      ))}
    </div>
  );
});

export default CreateCard;
