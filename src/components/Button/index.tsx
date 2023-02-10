import React from "react";

import "./Button.scss";
import { ButtonProps } from "./Button.types";

const Button = ({ type, text }: ButtonProps) => {
  return (
    <button type="button" className={`button button-${type}`}>
      {text}
    </button>
  );
};

export default Button;
