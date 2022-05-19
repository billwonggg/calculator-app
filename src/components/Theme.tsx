import React, { useState } from "react";

type ThemeOptions = "neutral" | "light" | "dark";

const Theme = () => {
  const COLOR_SCHEME: ThemeOptions[] = ["neutral", "light", "dark"];
  const COLOR_CODE: string[] = ["#3a4764", "#e6e6e6", "#160628"];
  const [theme, setTheme] = useState<ThemeOptions>("neutral");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = Number(e.target.value);
    const newColorScheme = COLOR_SCHEME[idx - 1];
    setTheme(newColorScheme);
  };

  return (
    <input
      type="range"
      min="1"
      max="3"
      step="1"
      value={COLOR_SCHEME.indexOf(theme) + 1}
      onChange={(e) => handleChange(e)}
    />
  );
};

export default Theme;
