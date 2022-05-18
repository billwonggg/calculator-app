import React, { useState } from "react";
import Calculator from "./components/Calculator";
import Screen from "./components/Screen";
import Button from "./components/Button";
import ButtonBox from "./components/ButtonBox";
import { KeyPad, Key } from "./data/KeyPad";
import {
  handleNumber,
  handleReset,
  handleDelete,
  handleOperation,
  handleEqual,
} from "./util/KeyPress";
import "./App.css";

const App = () => {
  interface Calc {
    sign: string;
    input: number;
    result: number;
  }

  const [data, setData] = useState<Calc>({
    sign: "",
    input: 0,
    result: 0,
  });

  /**
   * Routes clicked buttons to the relevant functions
   * @param val
   * */
  const handleButtonClick = (val: Key): void => {
    switch (val.className) {
      case "number":
      case "reset":
      case "delete":
      case "operation":
      case "equal":
    }
  };

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
