import useCalculator from "../context/useCalculator";
import { Key } from "../data/KeyPad";

const OperationButton = ({ display, className }: Key) => {
  const helpers = useCalculator();
  const handleClick = () => {
    helpers.addToEquation(display);
    helpers.setInitialState(false);
  };

  return (
    <button className={className} onClick={handleClick}>
      {display}
    </button>
  );
};

export default OperationButton;
