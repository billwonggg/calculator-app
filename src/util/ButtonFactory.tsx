import { ButtonProps } from "../components/Button";
import EqualsButton from "../components/EqualsButton";
import ClearButton from "../components/ClearButton";
import ValueButton from "../components/ValueButton";

class ButtonFactory {
  getButton({ value, equation, setEquation }: ButtonProps): JSX.Element {
    if (value.display === "=") return this.getEqualsButton({ value, equation, setEquation });
    else if (value.display === "AC") return this.getClearButton({ value, equation, setEquation });
    else return this.getValueButton({ value, equation, setEquation });
  }
  getClearButton({ value, equation, setEquation }: ButtonProps): JSX.Element {
    return <ClearButton value={value} equation={equation} setEquation={setEquation} />;
  }

  getValueButton({ value, equation, setEquation }: ButtonProps): JSX.Element {
    return <ValueButton value={value} equation={equation} setEquation={setEquation} />;
  }

  getEqualsButton({ value, equation, setEquation }: ButtonProps): JSX.Element {
    return <EqualsButton value={value} equation={equation} setEquation={setEquation} />;
  }
}

export default ButtonFactory;
