import React from "react";
import ThemeProvider from "./ThemeProvider";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "./ThemeProvider";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-toggle/style.css";
import "../styles/global.scss";
import "prismjs/themes/prism-solarizedlight.css";

//이런식으로도 fontawesome를 사용하는 방법도 있음, 처음 알았음
config.autoAddCss = false;
library.add(faSun, faMoon);

const MainWrapper = ({ children }) => {
  const { theme } = useTheme();

  return (
    <>
    <div className={`main-wrapper ${theme.type}`}>
      {children}
    </div>
    <style>
      {`
      html, body {
        background-color: ${theme.background};
        color: ${theme.fontColor};
        transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
      }
      `}
    </style>
    </>
  )

}

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <MainWrapper>{children}</MainWrapper>
    </ThemeProvider>
  );
}
