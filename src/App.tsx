import React from "react";
import Calculator from "./components/Calculator";
import Screen from "./components/Screen";
import Button from "./components/Button";
import ButtonBox from "./components/ButtonBox";
import "./App.css";

const App = () => {
  const keyPad: (number | string)[][] = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "x"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];
  return (
    <div className="App">
      <Calculator>
        <Screen value={"0"} />
        <ButtonBox>
          {keyPad.flat().map((val: string | number, i: number) => {
            return (
              <Button
                key={i}
                className={val === 0 ? "zero" : val === "=" ? "equal" : ""}
                value={val}
                onClick={() => {
                  console.log(`${val} clicked`);
                }}
              />
            );
          })}
        </ButtonBox>
      </Calculator>
    </div>
  );
};

export default App;
