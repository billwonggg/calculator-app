import { Key } from "../data/KeyPad";

export interface ButtonProps {
  value: Key;
  equation: string;
  setEquation: React.Dispatch<React.SetStateAction<string>>;
}
