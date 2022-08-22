import { ButtonProps } from "./Button";

const ClearButton = ({ value, equation, setEquation }: ButtonProps) => {
  const handleClick = () => {
    setEquation("");
  };

  return (
    <button key={value.display} className={value.className} onClick={handleClick}>
      {equation === "" ? "AC" : "CE"}
    </button>
  );
};

export default ClearButton;
