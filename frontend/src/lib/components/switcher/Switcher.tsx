import React from "react";
import "./switcher.css";

export default function Switcher(props: any) {
  return (
    <label className={"switch"} onChange={() => props.handleChange("CHANGED")}>
      <input type={"checkbox"} />
      <span className={"slider round"} />
    </label>
  );
}
