import React, { useState } from "react";
import { getTheme, updateTheme } from "../util/ThemeChange";

export type ThemeOptions = "neutral" | "light" | "dark";

const Theme = () => {
  const COLOR_THEME: ThemeOptions[] = ["neutral", "light", "dark"];
  const COLOR_CODE: string[] = ["#3a4764", "#e6e6e6", "#160628"];
  const [theme, setTheme] = useState<ThemeOptions>("neutral");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = Number(e.target.value);
    const newTheme = COLOR_THEME[idx - 1];
    setTheme(newTheme);
    updateTheme(newTheme);
  };

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
