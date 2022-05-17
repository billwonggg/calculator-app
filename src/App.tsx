import React from "react";
import Calculator from "./components/Calculator";
import "./App.css";

const App = () => {
  const keyPad: (number | string)[][] = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];
  return <Calculator>hi</Calculator>;
};

export default App;
