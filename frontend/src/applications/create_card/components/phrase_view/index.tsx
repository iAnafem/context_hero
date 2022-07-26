import React, { useEffect, useState } from "react";
import IconButton from "../../../../lib/components/icon_button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faCheck,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
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
      {editIdx === props.idx ? (
        <IconButton
          icon={
            <FontAwesomeIcon
              icon={faSquareCheck}
              size={"lg"}
              color={"#57bb8a"}
            />
          }
          clickHandler={() => setEditIdx(-1)}
        />
      ) : (
        <IconButton
          icon={<FontAwesomeIcon icon={faEdit} size={"lg"} color={"#22596e"} />}
          clickHandler={() => setEditIdx(props.idx)}
        />
      )}
      {editIdx === props.idx ? (
        <div className={"editPhrase"}>
          <PhraseInput
            initPhrase={ccStore.phrases[props.idx].phrase}
            idx={props.idx}
          />
        </div>
      ) : (
        <div className={"storedPhrase"}>
          {props.item.phrase.split(" ").map((word: string, idx: number) => (
            <div
              key={`${idx}_${word}`}
              className={"phraseWord"}
              onClick={() => ccStore.addWord(props.idx, idx)}
              onMouseEnter={() => console.log("hover")}
            >
              {word}&nbsp;
            </div>
          ))}
        </div>
      )}
      <IconButton
        icon={<FontAwesomeIcon icon={faTrash} size={"lg"} color={"#22596e"} />}
        clickHandler={() => ccStore.removePhrase(props.idx)}
      />
    </div>
  );
});

export default PhraseView;
