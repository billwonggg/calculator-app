import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("hello world", () => {
  expect("hello world").toContain("hello");
});

test("renders calculator text", () => {
  const { getByText } = render(<App />);
  const textElement = getByText(/calculator/i);
  expect(textElement).toBeTruthy();
});

describe("check buttons", () => {
  test("numbers 0-9", () => {
    render(<App />);
    for (let i = 0; i <= 9; i++) {
      const num = screen.getByText(i.toString(), { selector: "button" });
      expect(num).toBeTruthy();
    }
  });
});
