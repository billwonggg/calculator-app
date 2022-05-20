import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Hello Jest", () => {
  expect("Hello Jest").toContain("Jest");
});

test("renders calculator text", () => {
  const { getByText } = render(<App />);
  const textElement = getByText(/calculator/i);
  expect(textElement).toBeTruthy();
});

describe("Check button text", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("numbers 0-9 text", () => {
    for (let i = 0; i <= 9; i++) {
      const num = screen.getByText(i.toString(), { selector: "button" });
      expect(num).toBeTruthy();
    }
  });

  test("operation button text", () => {
    const operations: string[] = ["+", "-", "x", "/", "+-"];
    operations.forEach((element: string) => {
      const res = screen.getByText(element, { selector: "button" });
      expect(res).toBeTruthy();
    });
  });
  test("other button text", () => {
    const other: string[] = ["=", "AC", "DEL", "."];
    other.forEach((element: string) => {
      const res = screen.getByText(element, { selector: "button" });
      expect(res).toBeTruthy();
    });
  });
});
