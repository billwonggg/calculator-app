import { ButtonProps } from "../util/ButtonFactory";
import { setInitialState, clearEquation, addToEquation } from "../util/CalculatorHelpers";

const NumberButton = ({ state, setState, data }: ButtonProps) => {
  const initial = state.initialState;
  const handleClick = () => {
    if (initial) {
      clearEquation(setState);
      setInitialState(setState, false);
    }
    addToEquation(setState, data.display);
  };

  return (
    <button className={data.className} onClick={handleClick}>
      {data.display}
    </button>
  );
};

export default NumberButton;
