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
  handleInvert,
} from "./util/KeyPress";
import "./App.css";

export interface Calc {
  sign: "" | "-";
  input: string;
  result: string;
}

const App = () => {
  const [data, setData] = useState<Calc>({
    sign: "",
    input: "0",
    result: "0",
  });

  /**
   * Routes clicked buttons to the relevant functions
   * @param val
   * */
  const handleButtonClick = (val: Key): void => {
    switch (val.type) {
      case "number":
        handleNumber(val, data, setData);
        break;
      case "reset":
        handleReset(data, setData);
        break;
      case "delete":
        handleDelete(data, setData);
        break;
      case "operation":
      case "equal":
      case "invert":
        handleInvert(data, setData);
        break;
    }
  };

  console.log(
    `sign: ${data.sign}\ninput: ${data.input}\nresult: ${data.result}\n`
  );
  return (
    <div className="App">
      <Calculator>
        <Screen value={data.input} />
        <ButtonBox>
          {KeyPad.flat().map((val: Key, i: number) => {
            return (
              <Button
                key={i}
                className={val.className}
                value={val.value}
                onClick={() => handleButtonClick(val)}
              />
            );
          })}
        </ButtonBox>
      </Calculator>
    </div>
  );
};

export default App;
