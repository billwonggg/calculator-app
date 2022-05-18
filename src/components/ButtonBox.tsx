import React from "react";

interface ButtonBoxChild {
  children?: React.ReactNode;
}

const ButtonBox = ({ children }: ButtonBoxChild) => {
  return <div className="buttonbox">{children}</div>;
};

export default ButtonBox;
