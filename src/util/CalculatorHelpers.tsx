import { StateInterface } from "../App";

type setStateFn = React.Dispatch<React.SetStateAction<StateInterface>>;

export const setInitialState = (setState: setStateFn, val: boolean) => {
  setState((prevState) => ({ ...prevState, initialState: val }));
};

export const addToEquation = (setState: setStateFn, val: string) => {
  setState((prevState) => {
    const prev = prevState.equation;
    const newEquation = prev === "0" ? val : prev + val;
    return { ...prevState, equation: newEquation };
  });
};

export const setEquation = (setState: setStateFn, val: string) => {
  setState((prevState) => ({ ...prevState, equation: val }));
};

export const clearEquation = (setState: setStateFn) => {
  setState((prevState) => ({ ...prevState, equation: "0" }));
};

export const popBackEquation = (setState: setStateFn) => {
  setState((prevState) => {
    const eq = prevState.equation;
    const newEq = eq.length > 1 ? eq.substring(0, eq.length - 1) : "0";
    return { ...prevState, equation: newEq };
  });
};

export const addToHistory = (state: StateInterface, equation: string) => {
  state.history.push(equation);
};
