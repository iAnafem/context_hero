import React, { EffectCallback, useEffect } from "react";
import store from "./stores/cardsStackStore";
import { Card } from "./card/Card";
import { observer } from "mobx-react";

export const StudyCards = observer(() => {
  useEffect((): any => {
    return store.fetch();
  }, []);
  return (
    <div>
      <Card />
    </div>
  );
});
