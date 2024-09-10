import React from "react";
import Toggle from "react-toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ className }) {
  const { changeTheme } = useTheme();

  const toggleClicked = () => {
    changeTheme();
  };

  return (
    <Toggle
      onChange={toggleClicked}
      className={`day-night-toggle ${className}`}
      icons={{
        checked: <FontAwesomeIcon inverse icon="sun"></FontAwesomeIcon>,
        unchecked: <FontAwesomeIcon inverse icon="moon"></FontAwesomeIcon>,
      }}
    />
  );
}
