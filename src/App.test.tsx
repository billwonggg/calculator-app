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

  test("Numbers 0-9 text", () => {
    for (let i = 0; i <= 9; i++) {
      const num = screen.getByText(i.toString(), { selector: "button" });
      expect(num).toBeTruthy();
    }
  });

  test("Operation buttons text", () => {
    const operations: string[] = ["+", "-", "x", "/", "+-"];
    operations.forEach((element: string) => {
      const res = screen.getByText(element, { selector: "button" });
      expect(res).toBeTruthy();
    });
  });
  test("Other buttons text", () => {
    const other: string[] = ["=", "AC", "DEL", "."];
    other.forEach((element: string) => {
      const res = screen.getByText(element, { selector: "button" });
      expect(res).toBeTruthy();
    });
  });
});

describe("Calculator functionality", () => {
  const setup = () => {
    const dom = render(<App />);
    buttonPress("AC");
    return dom;
  };

  const buttonPress = (...args: string[]): void => {
    args.forEach((expression) => {
      const button = screen.getByText(expression, { selector: "button" });
      userEvent.click(button);
    });
  };

  test("Basic addition small", () => {
    const dom = setup();
    buttonPress("5", "0", "+", "5", "0", "=");
    dom.container.querySelector("#screen");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((50 + 50).toString());
  });

  test("Basic addition large", () => {
    const dom = setup();
    buttonPress("4", "0", "0", "0", "0", "+", "1", "9", "9", "0", "0", "=");
    dom.container.querySelector("#screen");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((40000 + 19900).toString());
  });

  test("Basic addition negative", () => {
    const dom = setup();
    buttonPress("1", "0", "0", "+-", "+", "5", "0", "=");
    dom.container.querySelector("#screen");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((-100 + 50).toString());
  });

  test("Basic addition double negative", () => {
    const dom = setup();
    buttonPress("1", "0", "0", "+-", "-", "2", "0", "0", "+-", "=");
    dom.container.querySelector("#screen");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((-100 - -200).toString());
  });

  test("Basic subtraction small", () => {
    const dom = setup();
    buttonPress("5", "2", "-", "2", "1", "=");
    dom.container.querySelector("#screen");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((52 - 21).toString());
  });

  test("Basic subtraction large", () => {
    const dom = setup();
    buttonPress("4", "5", "8", "7", "9", "-", "2", "6", "5", "4", "3", "=");
    dom.container.querySelector("#screen");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((45879 - 26543).toString());
  });

  test("Basic multiplication small", () => {
    const dom = setup();
    buttonPress("3", "x", "1", "2", "=");
    dom.container.querySelector("#screen");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((3 * 12).toString());
  });

  test("Basic multiplication negative", () => {
    const dom = setup();
    buttonPress("1", "1", "+-", "x", "1", "1", "=");
    dom.container.querySelector("#screen");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((-11 * 11).toString());
  });

  test("Basic multiplication large", () => {
    const dom = setup();
    buttonPress("4", "5", "8", "7", "9", "x", "2", "6", "5", "4", "3", "=");
    dom.container.querySelector("#screen");
    const res = dom.container.querySelector("#screen");
    expect(res?.innerHTML).toEqual((45879 * 26543).toString());
  });
});
