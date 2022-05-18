import React from "react";
import { Key } from "../data/KeyPad";
import { Calc } from "../App";

// 1...9 and .
export const handleNumber = (
  val: Key,
  data: Calc,
  setData: React.Dispatch<React.SetStateAction<Calc>>
): void => {
  // length too long
  if (data.first.length >= 16) return;
  // handle decimal place, use REGEX to check for number of existing decimals
  if ((val.value === "." && data.first.match(/\./g)) || [].length >= 1) return;

  setData({
    ...data,
    sign: data.sign,
    first:
      data.first === "0" && val.value !== "."
        ? val.value.toString() // replace the initial 0
        : data.first + val.value.toString(), // append to the current number
    second: data.second,
  });
};

// AC
export const handleReset = (
  data: Calc,
  setData: React.Dispatch<React.SetStateAction<Calc>>
): void => {
  setData({
    ...data,
    sign: "",
    first: "0",
    second: "0",
  });
};

// DEL
export const handleDelete = (
  data: Calc,
  setData: React.Dispatch<React.SetStateAction<Calc>>
): void => {
  let new_first = data.first;
  let single = false;
  if (
    data.first.length === 1 ||
    (data.first.length === 2 && data.first.charAt(0) === "-")
  ) {
    // single digit
    new_first = "0";
    single = true;
  } else {
    // remove last element
    new_first = data.first.slice(0, -1);
  }
  setData({
    ...data,
    sign: data.sign,
    first: new_first,
    second: data.second,
  });
};

// + - x /
export const handleOperation = (
  val: Key,
  data: Calc,
  setData: React.Dispatch<React.SetStateAction<Calc>>
): void => {};

export const handleInvert = (
  data: Calc,
  setData: React.Dispatch<React.SetStateAction<Calc>>
): void => {
  if (data.first === "0") return;
  setData({
    ...data,
    sign: data.sign,
    first:
      data.first.charAt(0) === "-" ? data.first.slice(1) : "-" + data.first,
    second: data.second,
  });
};

// =
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
