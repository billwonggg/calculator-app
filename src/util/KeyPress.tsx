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
    if (num.length >= 16) return;
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
): void => {
  if (val.type === "operation") {
    setData({
      ...data,
      sign: val.value,
      first: data.first,
      second: data.second,
    });
  }
};

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
  const res = calculate(Number(data.first), Number(data.second), data.sign);

  setData({
    ...data,
    sign: data.sign,
    first: res.toString(),
    second: "0",
  });
};
