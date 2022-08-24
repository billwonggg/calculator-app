import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// Jest DOM doesn't support window match media
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addEventListener: function () {},
      removeEventListener: function () {},
    };
  };

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
    const operations: string[] = ["+", "-", "×", "÷"];
    operations.forEach((element: string) => {
      const res = screen.getByText(element, { selector: "button" });
      expect(res).toBeTruthy();
    });
  });

  test("Other buttons", () => {
    const other: string[] = ["=", "AC", "(", ".", ")"];
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
  for (let i = 0; i < args.length; i++) {
    const button = screen.getByText(args[i], { selector: "button" });
    expect(button).toBeDefined();
    userEvent.click(button);
  }
};

const calc = (num: number): string => {
  let ans = num.toString();
  if (ans.length > 10) {
    ans = num.toPrecision(8);
  }
  return ans;
};

describe("Clear button", () => {
  test("Clear all", () => {
    const dom = setup();
    const res = dom.container.querySelector("#screen-bottom");
    buttonPress("5", "9", "8", "+", "3", "=");
    expect(res?.innerHTML).toEqual("601");
    buttonPress("AC");
    expect(res?.innerHTML).toEqual("0");
  });

  test("Delete numbers positive", () => {
    const dom = setup();
    const res = dom.container.querySelector("#screen-bottom");
    buttonPress("5", "9", "9");
    expect(res?.innerHTML).toEqual("599");
    buttonPress("CE");
    expect(res?.innerHTML).toEqual("59");
    buttonPress("CE");
    expect(res?.innerHTML).toEqual("5");
    buttonPress("CE");
    expect(res?.innerHTML).toEqual("0");
  });

  test("Delete numbers negative", () => {
    const dom = setup();
    const res = dom.container.querySelector("#screen-bottom");
    buttonPress("-", "5", "9", "9");
    expect(res?.innerHTML).toEqual("-599");
    buttonPress("CE");
    expect(res?.innerHTML).toEqual("-59");
    buttonPress("CE");
    expect(res?.innerHTML).toEqual("-5");
    buttonPress("CE");
    expect(res?.innerHTML).toEqual("-");
    buttonPress("CE");
    expect(res?.innerHTML).toEqual("0");
  });

  test("Delete first number during expression", () => {
    const dom = setup();
    const res = dom.container.querySelector("#screen-bottom");
    buttonPress("5", "0", "CE", "+", "4", "0", "=");
    expect(res?.innerHTML).toEqual(calc(5 + 40));
  });

  test("Delete second number during expression", () => {
    const dom = setup();
    const res = dom.container.querySelector("#screen-bottom");
    buttonPress("5", "0", "+", "4", "0", "CE", "=");
    expect(res?.innerHTML).toEqual(calc(50 + 4));
  });

  test("Delete both numbers during expression", () => {
    const dom = setup();
    const res = dom.container.querySelector("#screen-bottom");
    buttonPress("5", "0", "CE", "+", "4", "0", "CE", "=");
    expect(res?.innerHTML).toEqual(calc(5 + 4));
  });
});

describe("One expression tests", () => {
  test("Basic addition small", () => {
    const dom = setup();
    buttonPress("5", "0", "+", "3", "0", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(50 + 30));
  });

  test("Basic addition large", () => {
    const dom = setup();
    buttonPress("4", "0", "0", "0", "0", "+", "1", "9", "9", "0", "0", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(40000 + 19900));
  });

  test("Basic addition negative", () => {
    const dom = setup();
    buttonPress("-", "1", "0", "0", "+", "5", "0", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(-100 + 50));
  });

  test("Basic subtraction small", () => {
    const dom = setup();
    buttonPress("5", "2", "-", "2", "1", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(52 - 21));
  });

  test("Basic subtraction large", () => {
    const dom = setup();
    buttonPress("4", "5", "8", "7", "9", "-", "2", "6", "5", "4", "3", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(45879 - 26543));
  });

  test("Basic subtraction negative", () => {
    const dom = setup();
    buttonPress("-", "1", "0", "0", "-", "2", "0", "0", "=");
    dom.container.querySelector("#screen-bottom");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(-100 - 200));
  });

  test("Basic subtraction double negative", () => {
    const dom = setup();
    buttonPress("-", "1", "0", "0", "-", "(", "-", "2", "0", "0", ")", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(-100 - -200));
  });

  test("Basic multiplication small", () => {
    const dom = setup();
    buttonPress("3", "×", "1", "2", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(3 * 12));
  });

  test("Basic multiplication large", () => {
    const dom = setup();
    buttonPress("4", "5", "8", "7", "9", "×", "2", "6", "5", "4", "3", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(45879 * 26543));
  });

  test("Basic multiplication negative", () => {
    const dom = setup();
    buttonPress("-", "1", "1", "×", "1", "1", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(-11 * 11));
  });

  test("Basic multiplication double negative", () => {
    const dom = setup();
    buttonPress("-", "1", "1", "×", "-", "1", "1", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(-11 * -11));
  });

  test("Basic division small", () => {
    const dom = setup();
    buttonPress("5", "2", "÷", "6", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(52 / 6));
  });

  test("Basic division large", () => {
    const dom = setup();
    buttonPress("4", "5", "8", "7", "9", "÷", "2", "6", "5", "4", "3", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(45879 / 26543));
  });

  test("Basic division negative", () => {
    const dom = setup();
    buttonPress("-", "1", "2", "1", "÷", "1", "1", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(-121 / 11));
  });

  test("Basic division double negative", () => {
    const dom = setup();
    buttonPress("-", "1", "2", "1", "÷", "-", "1", "1", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(-121 / -11));
  });

  test("Division by zero", () => {
    const dom = setup();
    buttonPress("1", "2", "1", "÷", "0", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(121 / 0));
  });
});

describe("Multiple expressions with pressing equal", () => {
  test("Addition", () => {
    const dom = setup();
    buttonPress("1", "2", "+", "1", "1", "=", "+", "9", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(12 + 11 + 9));
  });

  test("Subtraction", () => {
    const dom = setup();
    buttonPress("1", "2", "-", "1", "1", "=", "-", "9", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(12 - 11 - 9));
  });

  test("Multiplication", () => {
    const dom = setup();
    buttonPress("1", "2", "×", "1", "1", "=", "×", "9", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(12 * 11 * 9));
  });

  test("Division", () => {
    const dom = setup();
    buttonPress("1", "2", "1", "÷", "1", "1", "=", "÷", "9", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(121 / 11 / 9));
  });

  test("Addition + multiplication", () => {
    const dom = setup();
    buttonPress("1", "2", "1", "+", "1", "1", "=", "×", "9", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc((121 + 11) * 9));
  });

  test("Subtraction + division", () => {
    const dom = setup();
    buttonPress("1", "2", "1", "-", "1", "1", "=", "÷", "9", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc((121 - 11) / 9));
  });

  test("Mix all", () => {
    const dom = setup();
    buttonPress("1", "1", "+", "1", "=", "÷", "4", "=", "×", "5", "=", "-", "7", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(((11 + 1) / 4) * 5 - 7));
  });
});

describe("Multiple expressions without pressing equal", () => {
  test("Addition", () => {
    const dom = setup();
    buttonPress("1", "2", "+", "1", "1", "+", "9", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(12 + 11 + 9));
  });

  test("Subtraction", () => {
    const dom = setup();
    buttonPress("1", "2", "-", "1", "1", "-", "9", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(12 - 11 - 9));
  });

  test("Multiplication", () => {
    const dom = setup();
    buttonPress("1", "2", "×", "1", "1", "×", "9", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(12 * 11 * 9));
  });

  test("Division", () => {
    const dom = setup();
    buttonPress("1", "2", "1", "÷", "1", "1", "÷", "9", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(121 / 11 / 9));
  });

  test("Addition + multiplication", () => {
    const dom = setup();
    buttonPress("1", "2", "1", "×", "1", "1", "+", "9", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(121 * 11 + 9));
  });

  test("Subtraction + division", () => {
    const dom = setup();
    buttonPress("1", "2", "1", "÷", "1", "0", "-", "9", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(121 / 10 - 9));
  });
});

describe("Complex expressions with brackets", () => {
  test("Addition", () => {
    const dom = setup();
    buttonPress("1", "2", "+", "(", "1", "1", "+", "9", ")", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(12 + (11 + 9)));
  });

  test("Subtraction", () => {
    const dom = setup();
    buttonPress("1", "2", "-", "(", "1", "1", "-", "9", ")", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(12 - (11 - 9)));
  });

  test("Multiplication", () => {
    const dom = setup();
    buttonPress("1", "2", "×", "(", "1", "1", "×", "9", ")", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(12 * (11 * 9)));
  });

  test("Division", () => {
    const dom = setup();
    buttonPress("1", "2", "1", "÷", "(", "1", "1", "÷", "9", ")", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(121 / (11 / 9)));
  });

  test("Addition + multiplication", () => {
    const dom = setup();
    buttonPress("1", "2", "1", "×", "(", "1", "1", "+", "9", ")", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(121 * (11 + 9)));
  });

  test("Subtraction + division2", () => {
    const dom = setup();
    buttonPress("1", "2", "1", "÷", "(", "1", "0", "-", "9", ")", "=");
    const res = dom.container.querySelector("#screen-bottom");
    expect(res?.innerHTML).toEqual(calc(121 / (10 - 9)));
  });
});
