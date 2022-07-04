import React, { ReactElement, useState } from "react";
import "./index.css";

interface IIconButton {
  toggleSound(value: number): void;
  icons: { [key: number]: ReactElement };
}

const StateCheckbox = (props: IIconButton) => {
  const [isChecked, check] = useState(1);
  const handleClick = () => {
    const value = isChecked === 1 ? 0 : 1;
    check(value);
    props.toggleSound(value);
  };
  return (
    <div>
      <button className={"root"} onClick={handleClick}>
        {props.icons[isChecked]}
      </button>
    </div>
  );
};

export default StateCheckbox;
