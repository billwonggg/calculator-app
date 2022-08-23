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
    <div ref={dropdown}>
      <HistoryIcon style={{ cursor: "pointer" }} onClick={() => setOpen(!open)} />
      {open && <HistoryDropdown histArr={histArr} setState={setState} setOpen={setOpen} />}
    </div>
  );
};

interface HistoryDropdownProps extends HistoryProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HistoryDropdown = ({ histArr, setState, setOpen }: HistoryDropdownProps) => {
  return (
    <div id="history-dropdown">
      {histArr.length === 0 ? (
        <h4>Your calculations will appear here so you could reuse them.</h4>
      ) : (
        histArr.map((item, i) => {
          return (
            <button
              id="history-item-button"
              key={i}
              value={item}
              style={{ margin: "10px 0px" }}
              onClick={(e) => {
                setEquation(setState, (e.target as HTMLInputElement).value);
                setOpen(false);
              }}
            >
              {item}
            </button>
          );
        })
      )}
    </div>
  );
};

export default History;
