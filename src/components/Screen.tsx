import { StateInterface } from "../App";
import History from "./History";
interface Display {
  value: string;
  history: string[];
  setState: React.Dispatch<React.SetStateAction<StateInterface>>;
}

const Screen = ({ value, history, setState }: Display) => {
  return (
    <div id="screen">
      <div id="screen-top">
        <History histArr={history} setState={setState} />
      </div>
      <div id="screen-bottom">{value}</div>
    </div>
  );
};

export default Screen;
