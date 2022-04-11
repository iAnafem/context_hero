import React from "react";
import "./switcher.css";

type TSwitcher = {
  handleChange(): void;
};

export default function Switcher(props: TSwitcher) {
  return (
    <label className={"switch"} onChange={() => props.handleChange()}>
      <input type={"checkbox"} />
      <span className={"slider round"} />
    </label>
  );
}
