import EqualsButton from "../components/EqualsButton";
import ClearButton from "../components/ClearButton";
import NumberButton from "../components/NumberButton";
import OperationButton from "../components/OperationButton";
import { Key } from "../data/KeyPad";
import { StateInterface } from "../App";

export interface ButtonProps {
  state: StateInterface;
  setState: React.Dispatch<React.SetStateAction<StateInterface>>;
  data: Key;
}
class ButtonFactory {
  getButton(props: ButtonProps): JSX.Element {
    if (props.data.className === "equal") return this.getEqualsButton(props);
    else if (props.data.className === "delete") return this.getClearButton(props);
    else if (props.data.className === "operation") return this.getOperationButton(props);
    else if (props.data.className === "number") return this.getNumberButton(props);
    return <div></div>;
  }
  getClearButton(props: ButtonProps): JSX.Element {
    return <ClearButton key={props.data.display} {...props} />;
  }

  getNumberButton(props: ButtonProps): JSX.Element {
    return <NumberButton key={props.data.display} {...props} />;
  }

  getEqualsButton(props: ButtonProps): JSX.Element {
    return <EqualsButton key={props.data.display} {...props} />;
  }

  getOperationButton(props: ButtonProps): JSX.Element {
    return <OperationButton key={props.data.display} {...props} />;
  }
}

export default ButtonFactory;
