import EqualsButton from "../components/EqualsButton";
import ClearButton from "../components/ClearButton";
import NumberButton from "../components/NumberButton";
import OperationButton from "../components/OperationButton";
import { Key } from "../data/KeyPad";

class ButtonFactory {
  getButton(data: Key): JSX.Element {
    if (data.className === "equal") return this.getEqualsButton(data);
    else if (data.className === "delete") return this.getClearButton(data);
    else if (data.className === "operation") return this.getOperationButton(data);
    else if (data.className === "number") return this.getValueButton(data);
    return <div></div>;
  }
  getClearButton(data: Key): JSX.Element {
    return <ClearButton {...data} />;
  }

  getValueButton(data: Key): JSX.Element {
    return <NumberButton {...data} />;
  }

  getEqualsButton(data: Key): JSX.Element {
    return <EqualsButton {...data} />;
  }

  getOperationButton(data: Key): JSX.Element {
    return <OperationButton {...data} />;
  }
}

export default ButtonFactory;
