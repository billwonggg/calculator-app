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
        handleOperation(val, data, setData);
        break;
      case "equal":
        handleEqual(data, setData);
        break;
      case "invert":
        handleInvert(data, setData);
        break;
    }
  };

  // console.log(
  //   `sign: ${data.sign}\nfirst: ${data.first}\nsecond: ${data.second}\n`
  // );
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
