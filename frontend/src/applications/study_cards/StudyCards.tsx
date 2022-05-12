import React, { EffectCallback, useEffect } from "react";
import stackStore from "./stores/cardsStackStore";
import cardStore from "./stores/cardStore";
import { Card } from "./card/Card";
import { observer } from "mobx-react";

export const StudyCards = observer(() => {
  useEffect((): any => {
    return stackStore.fetch();
  }, []);
  useEffect((): any => {
    if (stackStore.isLoaded) {
      cardStore.setCardData(stackStore.getCurrent());
    }
  }, [stackStore.isLoaded, stackStore.currNum]);
  return (
    <div>
      <Card />
    </div>
  );
});
