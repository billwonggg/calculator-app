import { useEffect, useRef, useState } from "react";
import { StateInterface } from "../App";
import HistoryIcon from "../icons/HistoryIcon";
import { setEquation } from "../util/CalculatorHelpers";

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

  return (
    <div ref={dropdown} className={open ? "dropdown active" : "dropdown"}>
      <HistoryIcon style={{ cursor: "pointer" }} onClick={() => setOpen(!open)} />
      {open && <HistoryDropdown histArr={histArr} setState={setState} setOpen={setOpen} />}
    </div>
  );
};

interface HistoryDropdownProps extends HistoryProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HistoryDropdown = ({ histArr, setState, setOpen }: HistoryDropdownProps) => {
  const handleClick = (e: React.MouseEvent) => {
    setEquation(setState, (e.target as HTMLInputElement).value);
    setOpen(false);
  };

  return (
    <div className="dropdown-items">
      {histArr.length === 0 ? (
        <h4>Your calculations will appear here so you could reuse them.</h4>
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
