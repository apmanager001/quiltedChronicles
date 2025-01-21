"use client";
import React, { useEffect, useState } from "react";
import "daisyui/dist/full.css";

const ThemeSelector = () => {
  const [theme, setTheme] = useState("coffee");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "coffee";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <select
        className="select select-bordered max-w-xs"
        name="theme"
        value={theme}
        onChange={handleThemeChange}
      >
        {/* <option value="dark">Dark</option>
        <option value="light">Light</option> */}
        <option value="coffee">Coffee</option>
        {/* <option value="retro">Retro</option>
        <option value="cyberpunk">Cyberpunk</option>
        <option value="valentine">Valentine</option>
        <option value="aqua">Aqua</option> */}
      </select>
    </div>
  );
};

export default ThemeSelector;
