import React from "react";
import { Key } from "../data/KeyPad";
import { Calc } from "../App";

// 1...9 and .
export const handleNumber = (
  val: Key,
  data: Calc,
  setData: React.Dispatch<React.SetStateAction<Calc>>
): void => {
  const check = (num: string): string | undefined => {
    // length too long
    if (num.length >= 10) return;
    // handle decimal place, use REGEX to check for number of existing decimals
    if ((val.value === "." && num.match(/\./g)) || [].length >= 1) return;

    let new_num =
      num === "0" && val.value !== "."
        ? val.value.toString() // replace the initial 0
        : num + val.value.toString(); // append to the current number
    return new_num;
  };

  const changed = check(data.sign === "" ? data.first : data.second);
  if (changed === undefined) return;
  setData({
    ...data,
    sign: data.sign,
    first: data.sign === "" ? changed : data.first,
    second: data.sign !== "" ? changed : data.second,
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
  const del = (num: string): string => {
    if (num === "0") return num;
    let new_first = num;
    if (num.length === 1 || (num.length === 2 && num.charAt(0) === "-")) {
      // single digit
      new_first = "0";
    } else {
      // remove last element
      new_first = num.slice(0, -1);
    }
    return new_first;
  };
  const changed = del(data.sign === "" ? data.first : data.second);
  setData({
    ...data,
    sign: data.sign,
    first: data.sign === "" ? changed : data.first,
    second: data.sign !== "" ? changed : data.second,
  });
};

// + - x /
export const handleOperation = (
  val: Key,
  data: Calc,
  setData: React.Dispatch<React.SetStateAction<Calc>>
): void => {
  setData({
    ...data,
    sign: val.value,
    first: data.first,
    second: data.second,
  });
};

export const handleInvert = (
  data: Calc,
  setData: React.Dispatch<React.SetStateAction<Calc>>
): void => {
  const invert = (num: string): string => {
    if (num === "0") return num;
    return num.charAt(0) === "-" ? num.slice(1) : "-" + num;
  };

  const changed = invert(data.sign === "" ? data.first : data.second);
  setData({
    ...data,
    sign: data.sign,
    first: data.sign === "" ? changed : data.first,
    second: data.sign !== "" ? changed : data.second,
  });
};

// =
export const handleEqual = (
  newSign: string,
  data: Calc,
  setData: React.Dispatch<React.SetStateAction<Calc>>
): void => {
  if (data.sign === "") return;
  const calculate = (a: number, b: number, sign: string): number => {
    let ans = 0;
    if (sign === "+") {
      ans = a + b;
    } else if (sign === "-") {
      ans = a - b;
    } else if (sign === "x") {
      ans = a * b;
    } else if (sign === "/") {
      ans = a / b;
    }
    return ans;
  };
  let calc: number = calculate(Number(data.first), Number(data.second), data.sign);
  let res: string = calc.toString();
  if (res.length > 10) {
    res = calc.toPrecision(5);
  }
  setData({
    ...data,
    sign: newSign,
    first: res,
    second: "0",
  });
};
