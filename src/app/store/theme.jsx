'use client'
import React, { useEffect, useState } from "react";

const ThemeSelector = () => {
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "default";
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
    <div className="dropdown dropdown-hover">
      <label tabIndex={0} className="btn m-1">
        Choose Theme
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <button onClick={handleThemeChange} value="dark">
            Dark
          </button>
        </li>
        <li>
          <button onClick={handleThemeChange} value="light">
            light
          </button>
        </li>
        <li>
          <button onClick={handleThemeChange} value="coffee">
            Coffee
          </button>
        </li>
        <li>
          <button onClick={handleThemeChange} value="retro">
            Retro
          </button>
        </li>
        <li>
          <button onClick={handleThemeChange} value="cyberpunk">
            Cyberpunk
          </button>
        </li>
        <li>
          <button onClick={handleThemeChange} value="valentine">
            Valentine
          </button>
        </li>
        <li>
          <button onClick={handleThemeChange} value="aqua">
            Aqua
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ThemeSelector;
