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
    const eq = state.equation;
    if (eq !== "0") val = eq + val;
    setState((state) => ({ ...state, equation: val }));
  }

  function setEquation(val: string) {
    setState((state) => ({ ...state, equation: val }));
  }

  function clearEquation() {
    setState((state) => ({ ...state, equation: "0" }));
  }

  function popBackEquation() {
    const eq = state.equation;
    const newEq = eq.length > 1 ? eq.substring(0, eq.length - 1) : "0";
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
