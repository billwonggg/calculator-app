export interface Key {
  type: string;
  value: string;
  className: string;
}

export const KeyPad: Key[] = [
  { type: "reset", value: "AC", className: "delete" },
  { type: "delete", value: "DEL", className: "delete" },
  { type: "invert", value: "+-", className: "operation" },
  { type: "operation", value: "/", className: "operation" },
  { type: "number", value: "7", className: "number" },
  { type: "number", value: "8", className: "number" },
  { type: "number", value: "9", className: "number" },
  { type: "operation", value: "x", className: "operation" },
  { type: "number", value: "4", className: "number" },
  { type: "number", value: "5", className: "number" },
  { type: "number", value: "6", className: "number" },
  { type: "operation", value: "-", className: "operation" },
  { type: "number", value: "1", className: "number" },
  { type: "number", value: "2", className: "number" },
  { type: "number", value: "3", className: "number" },
  { type: "operation", value: "+", className: "operation" },
  { type: "number", value: "0", className: "big number" },
  { type: "number", value: ".", className: "number" },
  { type: "equal", value: "=", className: "equal" },
];
