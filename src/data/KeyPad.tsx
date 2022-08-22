export interface Key {
  display: string;
  className: string;
}

export const KeyPad: Key[] = [
  { display: "(", className: "operation" },
  { display: ")", className: "operation" },
  { display: "%", className: "operation" },
  { display: "AC", className: "delete" },
  { display: "7", className: "number" },
  { display: "8", className: "number" },
  { display: "9", className: "number" },
  { display: "÷", className: "operation" },
  { display: "4", className: "number" },
  { display: "5", className: "number" },
  { display: "6", className: "number" },
  { display: "×", className: "operation" },
  { display: "1", className: "number" },
  { display: "2", className: "number" },
  { display: "3", className: "number" },
  { display: "-", className: "operation" },
  { display: "0", className: "number" },
  { display: ".", className: "number" },
  { display: "=", className: "equal" },
  { display: "+", className: "operation" },
];
