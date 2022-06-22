import React, { useState } from "react";

interface IIconButton {
  handleClick(): void;
  icons: { [key: number]: string };
}

export default function StateCheckbox(props: IIconButton) {
  const [isChecked, check] = useState(1);
  return (
    <div>
      <button onClick={() => check(isChecked === 1 ? 0 : 1)}>
        {props.icons[isChecked]}
      </button>
    </div>
  );
}
