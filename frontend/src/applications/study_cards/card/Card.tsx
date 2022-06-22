import React, { EffectCallback, useEffect, useState } from "react";
import "./card.css";
import cardStore from "../stores/cardStore";
import Switcher from "../../../lib/components/switcher/Switcher";
import Input from "../input/Input";
import { observer } from "mobx-react";
import { GradeBar } from "../grade_bar/GradeBar";

export const Card = observer(() => {
  return (
    <div className={"card"}>
      <div className={"cardHeader"}>{cardStore.grade === 0 && "New word!"}</div>
      <div className={"bodyWrap"}>
        <div className={"phrase"}>
          {cardStore.prefix.map((word: string, idx: number) => (
            <span className={"word"} key={`${word}_${idx}`}>
              {word}
            </span>
          ))}
          <Input store={cardStore} />
          {cardStore.suffix.map((word: string, idx: number) => (
            <span className={"word"} key={`${word}_${idx}`}>
              {word}
            </span>
          ))}
        </div>
        <div>
          <GradeBar cardStore={cardStore} />
        </div>
      </div>
      <div className={"typePanel"}>
        <div className={"answerType"}>{cardStore.answerType}</div>
        <div className={"typeSwitcher"}>
          <Switcher handleChange={cardStore.switchDescriptionType} />
        </div>
      </div>
      <div className={"description"}>
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
          <div className={"ansExplanation"}>{cardStore.answerExplanation}</div>
        )}
      </div>
    </div>
  );
});
