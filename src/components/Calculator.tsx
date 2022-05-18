import React from "react";

interface CalculatorChild {
  children?: React.ReactNode;
}

const Calculator = ({ children }: CalculatorChild) => {
  return <div className="calculator">{children}</div>;
};

export default Calculator;
