import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("Hello Jest", () => {
  expect("Hello Jest").toContain("Jest");
});

test("Renders calculator text", () => {
  const { getByText } = render(<App />);
  const textElement = getByText(/calculator/i);
  expect(textElement).toBeTruthy();
});

describe("Check button text", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("Numbers 0-9", () => {
    for (let i = 0; i <= 9; i++) {
      const num = screen.getByText(i.toString(), { selector: "button" });
      expect(num).toBeTruthy();
    }
  });

  test("Operation buttons", () => {
    const operations: string[] = ["+", "-", "x", "/", "+-"];
    operations.forEach((element: string) => {
      const res = screen.getByText(element, { selector: "button" });
      expect(res).toBeTruthy();
    });
  });
  test("Other buttons", () => {
    const other: string[] = ["=", "AC", "DEL", "."];
    other.forEach((element: string) => {
      const res = screen.getByText(element, { selector: "button" });
      expect(res).toBeTruthy();
    });
  });
});

const setup = () => {
  const dom = render(<App />);
  buttonPress("AC");
  return dom;
};

/**
 * Simulates button clicks on the calculator
 * @param args buttons to press
 * @returns None
 */
const buttonPress = (...args: string[]): void => {
  args.forEach((expression) => {
    const button = screen.getByText(expression, { selector: "button" });
    userEvent.click(button);
  });
};

describe("Clear and Delete button", () => {
  test("Clear all", () => {
    const dom = setup();
    const res = dom.container.querySelector("#screen");
    buttonPress("5", "9", "9", "+-");
    expect(res?.innerHTML).toEqual("-599");
    buttonPress("AC");
    expect(res?.innerHTML).toEqual("0");
  });

  test("Delete numbers positive", () => {
    const dom = setup();
    const res = dom.container.querySelector("#screen");
    buttonPress("5", "9", "9");
    expect(res?.innerHTML).toEqual("599");
    buttonPress("DEL");
    expect(res?.innerHTML).toEqual("59");
    buttonPress("DEL");
    expect(res?.innerHTML).toEqual("5");
    buttonPress("DEL");
    expect(res?.innerHTML).toEqual("0");
  });

  test("Delete numbers negative", () => {
    const dom = setup();
    const res = dom.container.querySelector("#screen");
    buttonPress("5", "9", "9", "+-");
    expect(res?.innerHTML).toEqual("-599");
    buttonPress("DEL");
    expect(res?.innerHTML).toEqual("-59");
    buttonPress("DEL");
    expect(res?.innerHTML).toEqual("-5");
    buttonPress("DEL");
    expect(res?.innerHTML).toEqual("0");
  });

  test("Delete first number during expression", () => {
    const dom = setup();
    const res = dom.container.querySelector("#screen");
    buttonPress("5", "0", "DEL", "+", "4", "0", "=");
    expect(res?.innerHTML).toEqual((5 + 40).toString());
  });

  test("Delete second number during expression", () => {
    const dom = setup();
    const res = dom.container.querySelector("#screen");
    buttonPress("5", "0", "+", "4", "0", "DEL", "=");
    expect(res?.innerHTML).toEqual((50 + 4).toString());
  });

  test("Delete both numbers during expression", () => {
    const dom = setup();
    const res = dom.container.querySelector("#screen");
    buttonPress("5", "0", "DEL", "+", "4", "0", "DEL", "=");
    expect(res?.innerHTML).toEqual((5 + 4).toString());
  });
});

describe("One expression tests", () => {
  test("Basic addition small", () => {
    const dom = setup();
    buttonPress("5", "0", "+", "3", "0", "=");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((50 + 30).toString());
  });

  test("Basic addition large", () => {
    const dom = setup();
    buttonPress("4", "0", "0", "0", "0", "+", "1", "9", "9", "0", "0", "=");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((40000 + 19900).toString());
  });

  test("Basic addition negative", () => {
    const dom = setup();
    buttonPress("1", "0", "0", "+-", "+", "5", "0", "=");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((-100 + 50).toString());
  });

  test("Basic subtraction small", () => {
    const dom = setup();
    buttonPress("5", "2", "-", "2", "1", "=");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((52 - 21).toString());
  });

  test("Basic subtraction large", () => {
    const dom = setup();
    buttonPress("4", "5", "8", "7", "9", "-", "2", "6", "5", "4", "3", "=");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((45879 - 26543).toString());
  });

  test("Basic subtraction negative", () => {
    const dom = setup();
    buttonPress("1", "0", "0", "+-", "-", "2", "0", "0", "=");
    dom.container.querySelector("#screen");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((-100 - 200).toString());
  });

  test("Basic subtraction double negative", () => {
    const dom = setup();
    buttonPress("1", "0", "0", "+-", "-", "2", "0", "0", "+-", "=");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((-100 - -200).toString());
  });

  test("Basic multiplication small", () => {
    const dom = setup();
    buttonPress("3", "x", "1", "2", "=");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((3 * 12).toString());
  });

  test("Basic multiplication large", () => {
    const dom = setup();
    buttonPress("4", "5", "8", "7", "9", "x", "2", "6", "5", "4", "3", "=");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((45879 * 26543).toString());
  });

  test("Basic multiplication negative", () => {
    const dom = setup();
    buttonPress("1", "1", "+-", "x", "1", "1", "=");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((-11 * 11).toString());
  });

  test("Basic multiplication double negative", () => {
    const dom = setup();
    buttonPress("1", "1", "+-", "x", "1", "1", "+-", "=");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((-11 * -11).toString());
  });

  test("Basic division small", () => {
    const dom = setup();
    buttonPress("5", "2", "/", "6", "=");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((52 / 6).toPrecision(5));
  });

  test("Basic division large", () => {
    const dom = setup();
    buttonPress("4", "5", "8", "7", "9", "/", "2", "6", "5", "4", "3", "=");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((45879 / 26543).toPrecision(5));
  });

  test("Basic division negative", () => {
    const dom = setup();
    buttonPress("1", "2", "1", "+-", "/", "1", "1", "=");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((-121 / 11).toString());
  });

  test("Basic division double negative", () => {
    const dom = setup();
    buttonPress("1", "2", "1", "+-", "/", "1", "1", "+-", "=");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((-121 / -11).toString());
  });

  test("Division by zero", () => {
    const dom = setup();
    buttonPress("1", "2", "1", "/", "0", "=");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((121 / 0).toString());
  });
});
