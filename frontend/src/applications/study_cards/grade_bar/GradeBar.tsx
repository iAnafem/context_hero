import React, { useState } from "react";
import { observer } from "mobx-react";
import "./gradeBar.css";
import { ICard } from "../types";

const gradeColors: { [key: number]: string } = {
  1: "green",
};

export const GradeBar = observer((props: { cardStore: ICard }) => {
  const grade = Number(props.cardStore.grade);
  const initColor = gradeColors[grade];
  const [color, setColor] = useState(initColor);
  return (
    <div className={"gradeBar"}>
      {[...Array(10)].map((e: number, idx: number) => {
        return (
          <div
            className={"grade"}
            key={`stripe_${idx}`}
            style={{ backgroundColor: color }}
          ></div>
        );
      })}
    </div>
  );
});
