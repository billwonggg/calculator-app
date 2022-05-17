import React from "react";
import "./Calculator.css";

interface CalculatorChild {
  children?: React.ReactNode;
}

const Calculator = ({ children }: CalculatorChild) => {
  return <div id="calculator">{children}</div>;
};

export default Calculator;
