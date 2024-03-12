"use client";

import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
const ThemeButton = () => {
  const [theme, setTheme] = useState("light"); //dakMode

  /* toggles the theme */
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  /* Theme according to system settings */
  useEffect(() => {
    /* check preference of the system */
    if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="cursor-pointer" onClick={toggleTheme}>
      {theme === "light" ? <FaMoon size={25} /> : <IoIosSunny size={30} />}
    </div>
  );
};

export default ThemeButton;
