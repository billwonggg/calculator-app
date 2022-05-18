export interface Key {
  type: string;
  value: string;
  className: string;
}

export const KeyPad: Key[] = [
  { type: "reset", value: "AC", className: "" },
  { type: "delete", value: "DEL", className: "" },
  { type: "operation", value: "+-", className: "" },
  { type: "operation", value: "/", className: "" },
  { type: "number", value: "7", className: "" },
  { type: "number", value: "8", className: "" },
  { type: "number", value: "9", className: "" },
  { type: "operation", value: "x", className: "" },
  { type: "number", value: "4", className: "" },
  { type: "number", value: "5", className: "" },
  { type: "number", value: "6", className: "" },
  { type: "operation", value: "-", className: "" },
  { type: "number", value: "1", className: "" },
  { type: "number", value: "2", className: "" },
  { type: "number", value: "3", className: "" },
  { type: "operation", value: "+", className: "" },
  { type: "number", value: "0", className: "zero" },
  { type: "number", value: ".", className: "" },
  { type: "result", value: "=", className: "equal" },
];
