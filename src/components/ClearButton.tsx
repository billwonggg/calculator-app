import useCalculator from "../context/useCalculator";
import { Key } from "../data/KeyPad";

const ClearButton = ({ display, className }: Key) => {
  const helpers = useCalculator();
  const initial = helpers.getState().initialState;
  const handleClick = () => {
    if (initial) helpers.clearEquation();
    else helpers.popBackEquation();
  };

  return (
    <button className={className} onClick={handleClick}>
      {initial ? "AC" : "CE"}
    </button>
  );
};

export default ClearButton;
