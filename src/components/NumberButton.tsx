import useCalculator from "../context/useCalculator";
import { Key } from "../data/KeyPad";

const NumberButton = ({ display, className }: Key) => {
  const helpers = useCalculator();
  const initial = helpers.getState().initialState;
  const handleClick = () => {
    if (initial) helpers.clearEquation();
    helpers.addToEquation(display);
    helpers.setInitialState(false);
  };

  return (
    <button key={display} className={className} onClick={handleClick}>
      {display}
    </button>
  );
};

export default NumberButton;
