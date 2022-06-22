import React, { ReactElement, useState } from "react";
import "./index.css";

interface IIconButton {
  handleClick(): void;
  icons: { [key: number]: ReactElement };
}

export default function StateCheckbox(props: IIconButton) {
  const [isChecked, check] = useState(1);
  return (
    <div>
      <button className={"root"} onClick={() => check(isChecked === 1 ? 0 : 1)}>
        {props.icons[isChecked]}
      </button>
    </div>
  );
}
