import React, { useState } from "react";
import { observer } from "mobx-react";
import "./gradeBar.css";
import { ICard } from "../../types";

const gradeColors: { [key: number]: string } = {
  1: "#dd776e",
  2: "#e0816d",
  3: "#e2886c",
  4: "#e6ad61",
  5: "#e2c965",
  6: "#f5ce62",
  7: "#d4c86a",
  8: "#b0be6e",
  9: "#84bb7b",
  10: "#57bb8a",
};

export const GradeBar = observer((props: { cardStore: ICard }) => {
  const grade = Number(props.cardStore.grade);
  const emptyStripeColor = "rgb(247 241 241)";
  return (
    <div className={"gradeBar"}>
      {Array.from({ length: 10 }, (_, i) => i + 1)
        .reverse()
        .map((idx: number) => {
          return (
            <div
              className={"grade"}
              key={`stripe_${idx}`}
              style={{
                backgroundColor:
                  idx > grade ? emptyStripeColor : gradeColors[grade],
              }}
            ></div>
          );
        })}
    </div>
  );
});
