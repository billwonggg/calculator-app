import React from "react";
import Calculator from "./components/Calculator";
import Screen from "./components/Screen";
import Button from "./components/Button";
import ButtonBox from "./components/ButtonBox";
import { KeyPad, Key } from "./data/KeyPad";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Calculator>
        <Screen value={"0"} />
        <ButtonBox>
          {KeyPad.flat().map((val: Key, i: number) => {
            return (
              <Button
                key={i}
                className={val.className}
                value={val.value}
                onClick={() => {
                  console.log(`${val.value} clicked`);
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
