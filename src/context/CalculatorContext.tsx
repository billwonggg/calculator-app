import { createContext, useState } from "react";

export interface StateInterface {
  equation: string;
  history: string[];
  initialState: boolean;
}

type ContextInterface = [StateInterface, React.Dispatch<React.SetStateAction<StateInterface>>];

const defaultState: StateInterface = { equation: "0", history: [], initialState: true };

const CalculatorContext = createContext<ContextInterface>([defaultState, () => {}]);

const CalculatorProvider = (props: any) => {
  const [state, setState] = useState(defaultState);
  return (
    <CalculatorContext.Provider value={[state, setState]}>
      {props.children}
    </CalculatorContext.Provider>
  );
};

export { CalculatorContext, CalculatorProvider };
