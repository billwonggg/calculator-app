import Theme, { ThemeOptions } from "../components/Theme";

const getLocalColorScheme = () => localStorage.getItem("colorScheme");

const setLocalColorScheme = (color: ThemeOptions) => {
  localStorage.setItem("colorScheme", color);
};

export const getTheme = () => {
  const preferDarkScheme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  let finalColorScheme: string;
  const localColorScheme = getLocalColorScheme();

  localColorScheme !== null
    ? (finalColorScheme = localColorScheme)
    : (finalColorScheme = preferDarkScheme ? "dark" : "neutral");

  return finalColorScheme;
};

export const updateTheme = (newColor: ThemeOptions) => {
  document.documentElement.setAttribute("data-theme", newColor);
  setLocalColorScheme(newColor);
};
