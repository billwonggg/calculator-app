import { ButtonProps } from "../util/ButtonFactory";
import { setInitialState, addToEquation } from "../util/CalculatorHelpers";

const OperationButton = ({ state, setState, data }: ButtonProps) => {
  const handleClick = () => {
    addToEquation(setState, data.display);
    setInitialState(setState, false);
  };

  return (
    <button className={data.className} onClick={handleClick}>
      {data.display}
    </button>
  );
};

export default OperationButton;
