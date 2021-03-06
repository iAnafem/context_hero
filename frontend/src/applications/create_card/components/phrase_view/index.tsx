import React, { useEffect, useState } from "react";
import IconButton from "../../../../lib/components/icon_button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import ccStore from "../../stores/createCardStore";
import { IPhraseToCreate } from "../../types";
import { observer } from "mobx-react";
import "./index.css";
import PhraseInput from "../phrase_input";

interface IPhraseView {
  item: IPhraseToCreate;
  idx: number;
}

const PhraseView = observer((props: IPhraseView) => {
  const [editIdx, setEditIdx] = useState(-1);

  useEffect(() => {
    setEditIdx(-1);
  }, [ccStore.phrases[props.idx].phrase]);

  return (
    <div className={"phraseContainer"}>
      <IconButton
        icon={<FontAwesomeIcon icon={faEdit} />}
        clickHandler={() => setEditIdx(props.idx)}
      />
      <div className={"storedPhrase"}>
        {editIdx === props.idx ? (
          <PhraseInput
            initPhrase={ccStore.phrases[props.idx].phrase}
            idx={props.idx}
          />
        ) : (
          props.item.phrase.split(" ").map((word: string, idx: number) => (
            <div key={`${idx}_${word}`} className={"phraseWord"}>
              {word}&nbsp;
            </div>
          ))
        )}
      </div>
      <IconButton
        icon={<FontAwesomeIcon icon={faTrash} />}
        clickHandler={() => ccStore.removePhrase(props.idx)}
      />
    </div>
  );
});

export default PhraseView;
