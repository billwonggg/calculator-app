import { ButtonProps } from "./Button";

const ValueButton = ({ value, equation, setEquation }: ButtonProps) => {
  const handleClick = () => {
    setEquation(equation + value.display);
  };

  return (
    <button key={value.display} className={value.className} onClick={handleClick}>
      {value.display}
    </button>
  );
};

export default ValueButton;
