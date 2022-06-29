import React, { useState } from "react";
import { observer } from "mobx-react";
import ccStore from "./stores/createCardStore";

const CreateCard = observer(() => {
  const [phrase, setPhrase] = useState("");
  const handleKeyDown = (key: string) => {
    if (key === "Enter") {
      ccStore.setPhrase(phrase);
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
      <p>{ccStore.phrase}</p>
    </div>
  );
});

export default CreateCard;
