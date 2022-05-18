import React from "react";
import { Key } from "../data/KeyPad";
import { Calc } from "../App";

export const handleNumber = (
  val: Key,
  data: Calc,
  setData: React.Dispatch<React.SetStateAction<Calc>>
): void => {
  // length too long
  if (data.input.length >= 16) return;
  // handle decimal place, use REGEX to check for number of existing decimals
  if ((val.value === "." && data.input.match(/\./g)) || [].length >= 1) return;

  setData({
    ...data,
    sign: data.sign,
    input:
      data.input === "0" && val.value !== "."
        ? val.value.toString() // replace the initial 0
        : data.input + val.value.toString(), // append to the current number
    result: data.result,
  });
};

export const handleReset = (
  data: Calc,
  setData: React.Dispatch<React.SetStateAction<Calc>>
): void => {
  setData({
    ...data,
    sign: "",
    input: "0",
    result: "0",
  });
};

export const handleDelete = (
  data: Calc,
  setData: React.Dispatch<React.SetStateAction<Calc>>
): void => {
  let new_input = data.input;
  if (data.input.length == 1) {
    new_input = "0";
  } else {
    // remove last element
    new_input = data.input.slice(0, -1);
  }
  setData({
    ...data,
    sign: data.input === "0" ? "" : data.input,
    input: new_input,
    result: data.result,
  });
};

export const handleOperation = (
  val: Key,
  data: Calc,
  setData: React.Dispatch<React.SetStateAction<Calc>>
): void => {};

export const handleEqual = (
  data: Calc,
  setData: React.Dispatch<React.SetStateAction<Calc>>
): void => {
  if (data.sign === "") return;
  const calculate = (a: number, b: number, sign: string): number => {
    let ans = 0;
    switch (sign) {
      case "+":
        ans = a + b;
        break;
      case "-":
        ans = a - b;
        break;
      case "x":
        ans = a * b;
        break;
      case "/":
        ans = a / b;
        break;
    }
    return ans;
  };
};
