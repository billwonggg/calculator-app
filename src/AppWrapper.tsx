import App from "./App";
import { CalculatorProvider } from "./context/CalculatorContext";

const AppWrapper = () => {
  return (
    <CalculatorProvider>
      <App />
    </CalculatorProvider>
  );
};

export default AppWrapper;
