import { ButtonProps } from "../util/ButtonFactory";
import { clearEquation, popBackEquation } from "../util/CalculatorHelpers";

const ClearButton = ({ state, setState, data }: ButtonProps) => {
  const handleClick = () => {
    if (state.initialState) clearEquation(setState);
    else popBackEquation(setState);
  };

  return (
    <button className={data.className} onClick={handleClick}>
      {state.initialState ? "AC" : "CE"}
    </button>
  );
};

export default ClearButton;
