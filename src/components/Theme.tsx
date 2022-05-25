import React, { useState, useEffect } from "react";
import { getTheme, updateTheme } from "../util/ThemeChange";

export type ThemeOptions = "neutral" | "light" | "dark";

const Theme = () => {
  const COLOR_THEME: ThemeOptions[] = ["neutral", "light", "dark"];
  const [theme, setTheme] = useState<ThemeOptions>(getTheme());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = Number(e.target.value);
    const newTheme = COLOR_THEME[idx - 1];
    setTheme(newTheme);
  };

  const handleColorChange = (e: MediaQueryListEvent) => {
    const newColorScheme = e.matches ? "dark" : "light";
    setTheme(newColorScheme);
  };

  useEffect(() => {
    updateTheme(theme);
  }, [theme]);

  // listen for system theme changes
  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addEventListener("change", (e) => handleColorChange(e));
    return () => darkThemeMq.removeEventListener("change", (e) => handleColorChange(e));
  }, []);

  return (
    <div className="theme-wrapper">
      <input
        className="theme-slider"
        type="range"
        min="1"
        max="3"
        step="1"
        value={COLOR_THEME.indexOf(theme) + 1}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default Theme;
