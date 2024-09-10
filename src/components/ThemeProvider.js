import React, { createContext, useContext, useState } from "react";

const themes = {
  light: {
    type: "light",
    fontColor: "#2b2c38",
    background: "#fff",
  },
  dark: {
    type: "dark",
    fontColor: "#dcdcdc",
    background: "#2b2c38",
  },
};

const ThemeContext = createContext({});

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(themes.light);

  const changeTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  const api = {
    theme,
    changeTheme,
  };

  return <ThemeContext.Provider value={api}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
