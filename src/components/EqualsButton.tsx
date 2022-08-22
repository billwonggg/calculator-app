import useCalculator from "../context/useCalculator";
import { evaluate } from "mathjs";
import { Key } from "../data/KeyPad";

const EqualsButton = ({ display, className }: Key) => {
  const helpers = useCalculator();
  const equation = helpers.getState().equation;
  const formatEquation = (eq: string): string => {
    return eq.replaceAll("×", "*").replaceAll("÷", "/").replaceAll("%", "*0.01");
  };

  const handleClick = () => {
    let res: number | null = null;
    try {
      res = evaluate(formatEquation(equation));
    } catch (e) {
      return;
    }
    if (res != null) {
      let resStr = res.toString();
      if (resStr.length > 10) resStr = res.toPrecision(8).toString();
      helpers.setEquation(resStr);
      helpers.setInitialState(true);
    }
  };

  return (
    <button className={className} onClick={handleClick}>
      {display}
    </button>
  );
};

export default EqualsButton;
