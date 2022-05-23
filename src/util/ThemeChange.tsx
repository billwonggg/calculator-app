import { ThemeOptions } from "../components/Theme";

const getLocalColorScheme = () => localStorage.getItem("colorScheme");

const setLocalColorScheme = (color: ThemeOptions) => {
  localStorage.setItem("colorScheme", color);
};

export const getTheme = (): ThemeOptions => {
  const preferDarkScheme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  let finalColorScheme: ThemeOptions = "neutral";
  const localColorScheme = getLocalColorScheme();
  if (localColorScheme === null) {
    finalColorScheme = preferDarkScheme ? "dark" : "light";
  } else {
    if (
      localColorScheme === "neutral" ||
      localColorScheme === "light" ||
      localColorScheme === "dark"
    )
      finalColorScheme = localColorScheme;
  }
  return finalColorScheme;
};

export const updateTheme = (newColor: ThemeOptions) => {
  document.documentElement.setAttribute("data-theme", newColor);
  setLocalColorScheme(newColor);
};
