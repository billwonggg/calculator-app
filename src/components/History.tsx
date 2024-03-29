import { useEffect, useRef, useState } from "react";
import { StateInterface } from "../App";
import HistoryIcon from "../icons/HistoryIcon";
import { setEquation, setInitialState } from "../util/CalculatorHelpers";

interface HistoryProps {
  histArr: string[];
  setState: React.Dispatch<React.SetStateAction<StateInterface>>;
}

const History = ({ histArr, setState }: HistoryProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: any) => {
      if (!dropdown.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const histCopy = [...histArr];
  const histReversed = histCopy.reverse();
  return (
    <div ref={dropdown} id="dropdown" className={open ? "dropdown active" : "dropdown closed"}>
      <HistoryIcon style={{ cursor: "pointer" }} onClick={() => setOpen(!open)} />
      <HistoryDropdown histArr={histReversed} setState={setState} setOpen={setOpen} />
    </div>
  );
};

interface HistoryDropdownProps extends HistoryProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HistoryDropdown = ({ histArr, setState, setOpen }: HistoryDropdownProps) => {
  const handleClick = (e: React.MouseEvent) => {
    setEquation(setState, (e.target as HTMLInputElement).value);
    setInitialState(setState, false);
    setOpen(false);
  };

  return (
    <div className="dropdown-items">
      {histArr.length === 0 ? (
        <h4 style={{ textAlign: "center" }}>
          Your calculations appear here so that you can reuse them.
        </h4>
      ) : (
        histArr.map((item, i) => {
          return (
            <button className="history-item calc-button" key={i} value={item} onClick={handleClick}>
              {item}
            </button>
          );
        })
      )}
    </div>
  );
};

export default History;
