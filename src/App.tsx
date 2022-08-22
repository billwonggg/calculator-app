import { useState } from "react";
import Calculator from "./components/Calculator";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { KeyPad, Key } from "./data/KeyPad";
import ButtonFactory from "./util/ButtonFactory";
import { ButtonProps } from "./components/Button";

const App = () => {
  const [equation, setEquation] = useState<string>("");
  const factory = new ButtonFactory();
  return (
    <div className="App">
      <Calculator>
        <Header />
        <Screen value={equation} />
        <ButtonBox>
          {KeyPad.flat().map((val: Key) => {
            const props: ButtonProps = {
              value: val,
              equation: equation,
              setEquation: setEquation,
            };
            return factory.getButton(props);
          })}
        </ButtonBox>
      </Calculator>
      <Footer />
    </div>
  );
};

export default App;
