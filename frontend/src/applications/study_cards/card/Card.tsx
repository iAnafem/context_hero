import React, { EffectCallback, useEffect, useState } from "react";
import "./card.css";
import cardStore from "../stores/cardStore";
import Switcher from "../../../lib/components/switcher/Switcher";
import Input from "../input/Input";
import { observer } from "mobx-react";

export const Card = observer(() => {
  return (
    <div className={"card"}>
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
      <div className={"typePanel"}>
        <span className={"answerType"}>{cardStore.answerType}</span>
        <span className={"typeSwitcher"}>
          <Switcher handleChange={cardStore.switchDescriptionType} />
        </span>
      </div>
      <div className={"description"}>
        {cardStore.descriptionType === 1 ? (
          <div className={"ansTranslation"}>
            {cardStore.answerTranslation.join(", ")}
          </div>
        ) : (
          <div className={"ansExplanation"}>{cardStore.answerExplanation}</div>
        )}
        <div className={"phraseTranslation"}>{cardStore.phraseTranslation}</div>
      </div>
    </div>
  );
});
