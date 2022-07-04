import React, { useState } from "react";
import { observer } from "mobx-react";
import ccStore from "./stores/createCardStore";
import { IPhraseToCreate } from "./types";
import PhraseView from "./components/phrase_view";

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
        <PhraseView item={item} idx={idx} key={`phrase_${idx}`} />
      ))}
    </div>
  );
});

export default CreateCard;
