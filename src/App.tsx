import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { KeyPad, Key } from "./data/KeyPad";
import ButtonFactory from "./util/ButtonFactory";
import useCalculator from "./context/useCalculator";

const App = () => {
  const state = useCalculator().getState();
  const factory = new ButtonFactory();

  return (
    <div className="App">
      <div className="calculator">
        <Header />
        <Screen value={state.equation} />
        <ButtonBox>{KeyPad.flat().map((val: Key) => factory.getButton(val))}</ButtonBox>
      </div>
      <Footer />
    </div>
  );
};

export default App;
