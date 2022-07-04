import React from "react";
import IconButton from "../../../../lib/components/icon_button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import ccStore from "../../stores/createCardStore";
import { IPhraseToCreate } from "../../types";
import { observer } from "mobx-react";
import "./index.css";

interface IPhraseView {
  item: IPhraseToCreate;
  idx: number;
}

const PhraseView = observer((props: IPhraseView) => {
  return (
    <div className={"phraseContainer"}>
      <div className={"phraseItem"}>{props.item.phrase}</div>
      <IconButton
        icon={<FontAwesomeIcon icon={faEdit} />}
        clickHandler={() => ccStore.removePhrase(props.idx)}
      />
      <IconButton
        icon={<FontAwesomeIcon icon={faTrash} />}
        clickHandler={() => ccStore.removePhrase(props.idx)}
      />
    </div>
  );
});

export default PhraseView;
