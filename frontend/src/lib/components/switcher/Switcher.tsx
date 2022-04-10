import React from "react";

export default function Switcher(props: any) {
  return (
    <label
      className={"typeSwitch"}
      onChange={() => props.handleChange("CHANGED")}
    >
      <input type={"checkbox"} />
      <span className={"typeSlider round"} />
    </label>
  );
}
