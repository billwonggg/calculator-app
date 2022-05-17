import React from "react";
import "./ButtonBox.css";

interface ButtonBoxChild {
  children?: React.ReactNode;
}

const ButtonBox = ({ children }: ButtonBoxChild) => {
  return <div id="buttonbox">{children}</div>;
};

export default ButtonBox;
