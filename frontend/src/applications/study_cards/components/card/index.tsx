import React from "react";
import "./index.css";
import cardStore from "../../stores/cardStore";
import Switcher from "../../../../lib/components/switcher/switcher";
import Input from "../input";
import { observer } from "mobx-react";
import GradeBar from "../grade_bar";
import StateCheckbox from "../../../../lib/components/state_checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeMute, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import cardsStackStore from "../../stores/cardsStackStore";

const Card = observer(() => {
  return (
    <div className={"card"}>
      <div className={"cardHeader"}>{cardStore.grade === 0 && "New word!"}</div>
      <div className={"bodyWrap"}>
        <div className={"phrase"}>
          {cardStore.prefix.map((word: string, idx: number) => (
            <span className={"word"} key={`${word}_${idx}`}>
              {word}&nbsp;
            </span>
          ))}
          <Input store={cardStore} />
          {cardStore.suffix.map((word: string, idx: number) => (
            <span className={"word"} key={`${word}_${idx}`}>
              {word}&nbsp;
            </span>
          ))}
        </div>
        <div>
          <GradeBar cardStore={cardStore} />
        </div>
      </div>
      <div className={"typePanel"}>
        <div className={"answerType"}>{cardStore.answerType}</div>
        <div className={"soundButton"}>
          <StateCheckbox
            toggleSound={cardsStackStore.toggleSound}
            icons={{
              1: <FontAwesomeIcon icon={faVolumeHigh} />,
              0: <FontAwesomeIcon icon={faVolumeMute} />,
            }}
          />
        </div>
      </div>
      <div className={"cardFooter"}>
        <div>
          {cardStore.descriptionType === 1 ? (
            <div>
              <div className={"ansTranslation"}>
                {cardStore.answerTranslation.join(", ")}
              </div>
              <div className={"phraseTranslation"}>
                {cardStore.phraseTranslation}
              </div>
            </div>
          ) : (
            <div className={"ansExplanation"}>
              {cardStore.answerExplanation}
            </div>
          )}
        </div>
        <div className={"typeSwitcherContainer"}>
          <div className={"typeSwitcher"}>
            <Switcher handleChange={cardStore.switchDescriptionType} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Card;
