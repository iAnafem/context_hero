import React from "react";
import { observer } from "mobx-react";
import ccStore from "./stores/createCardStore";
import { IPhraseToCreate } from "./types";
import PhraseView from "./components/phrase_view";
import PhraseInput from "./components/phrase_input";
import "./index.css";

const CreateCard = observer(() => {
  return (
    <div className={"root"}>
      <PhraseInput />
      {ccStore.phrases.map((item: IPhraseToCreate, idx: number) => (
        <PhraseView item={item} idx={idx} key={`phrase_${idx}`} />
      ))}
    </div>
  );
});

export default CreateCard;
