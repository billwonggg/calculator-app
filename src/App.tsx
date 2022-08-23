import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { KeyPad, Key } from "./data/KeyPad";
import ButtonFactory, { ButtonProps } from "./util/ButtonFactory";
import { useState } from "react";

export interface StateInterface {
  equation: string;
  history: string[];
  initialState: boolean;
}

const defaultState: StateInterface = { equation: "0", history: [], initialState: true };

const App = () => {
  const [state, setState] = useState<StateInterface>(defaultState);
  const factory = new ButtonFactory();
  return (
    <div className="App">
      <div className="calculator">
        <Header />
        <Screen value={state.equation} />
        <ButtonBox>
          {KeyPad.flat().map((val: Key) => {
            const props: ButtonProps = {
              state: state,
              setState: setState,
              data: val,
            };
            return factory.getButton(props);
          })}
        </ButtonBox>
      </div>
      <Footer />
    </div>
  );
};

export default App;
