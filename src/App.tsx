import { useState } from "react";
import Calculator from "./components/Calculator";
import Screen from "./components/Screen";
import Button from "./components/Button";
import ButtonBox from "./components/ButtonBox";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { KeyPad, Key } from "./data/KeyPad";
import {
  handleNumber,
  handleReset,
  handleDelete,
  handleOperation,
  handleEqual,
  handleInvert,
} from "./util/KeyPress";

export interface Calc {
  sign: string;
  first: string;
  second: string;
}

const App = () => {
  const [data, setData] = useState<Calc>({
    sign: "",
    first: "0",
    second: "0",
  });

  /**
   * Routes clicked buttons to the relevant functions
   * @param val
   * */
  const handleButtonClick = (val: Key): void => {
    if (val.type === "number") {
      handleNumber(val, data, setData);
    } else if (val.type === "reset") {
      handleReset(data, setData);
    } else if (val.type === "delete") {
      handleDelete(data, setData);
    } else if (val.type === "operation") {
      if (data.sign !== "") {
        handleEqual(val.value, data, setData);
      } else {
        handleOperation(val, data, setData);
      }
    } else if (val.type === "equal") {
      handleEqual("", data, setData);
    } else if (val.type === "invert") {
      handleInvert(data, setData);
    }
  };

  // console.log(`sign: ${data.sign}\nfirst: ${data.first}\nsecond: ${data.second}\n`);
  return (
    <>
      <div className="App">
        <Calculator>
          <Header />
          <Screen value={data.second === "0" ? data.first : data.second} />
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
        <Footer />
      </div>
    </>
  );
};

export default App;
