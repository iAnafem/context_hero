import React, { ReactElement } from "react";
import "./index.css";

interface IIconButton {
  icon: ReactElement;
  clickHandler(): void;
}

const IconButton = (props: IIconButton) => {
  return (
    <div>
      <button className={"root"} onClick={props.clickHandler}>
        {props.icon}
      </button>
    </div>
  );
};

export default IconButton;
