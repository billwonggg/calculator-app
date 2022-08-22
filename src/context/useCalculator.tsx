import { useContext } from "react";
import { CalculatorContext } from "./CalculatorContext";

const useCalculator = () => {
  const [state, setState] = useContext(CalculatorContext);

  function getState() {
    return state;
  }

  function setInitialState(val: boolean) {
    setState((state) => ({ ...state, initialState: val }));
  }

  function addToEquation(val: string) {
    setState((state) => ({ ...state, equation: state.equation + val }));
  }

  function setEquation(val: string) {
    setState((state) => ({ ...state, equation: val }));
  }

  function clearEquation() {
    setState((state) => ({ ...state, equation: "" }));
  }

  function popBackEquation() {
    const eq = state.equation;
    const newEq = eq.length > 0 ? eq.substring(0, eq.length - 1) : "";
    setState((state) => ({ ...state, equation: newEq }));
  }

  function addToHistory(equation: string) {
    state.history.push(equation);
  }

  return {
    getState,
    setInitialState,
    addToEquation,
    setEquation,
    clearEquation,
    popBackEquation,
    addToHistory,
  };
};

export default useCalculator;
