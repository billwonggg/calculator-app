import { ButtonProps } from "./Button";

const EqualsButton = ({ value, equation, setEquation }: ButtonProps) => {
  const formatEquation = (eq: string): string => {
    return eq.replaceAll("×", "*").replaceAll("÷", "/").replaceAll("%", "*0.01");
  };

  const handleClick = () => {
    const res = eval(formatEquation(equation));
    let resStr = res.toString();
    if (resStr.length > 10) resStr = res.toPrecision(8).toString();
    setEquation(resStr);
  };

  return (
    <button key={value.display} className={value.className} onClick={handleClick}>
      {value.display}
    </button>
  );
};

export default EqualsButton;
