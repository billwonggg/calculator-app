import { ButtonProps } from "../util/ButtonFactory";
import { setEquation, setInitialState } from "../util/CalculatorHelpers";
import { evaluate } from "mathjs";

const EqualsButton = ({ state, setState, data }: ButtonProps) => {
  const formatEquation = (eq: string): string => {
    return eq.replaceAll("×", "*").replaceAll("÷", "/").replaceAll("%", "*0.01");
  };
  const handleClick = () => {
    let res: number | null = null;
    try {
      res = evaluate(formatEquation(state.equation));
    } catch (e) {
      return;
    }
    if (res != null) {
      let resStr = res.toString();
      if (resStr.length > 10) resStr = res.toPrecision(8).toString();
      setInitialState(setState, true);
      setEquation(setState, resStr);
    }
  };

  return (
    <button className={data.className} onClick={handleClick}>
      {data.display}
    </button>
  );
};

export default EqualsButton;
