import React from "react";

import { useAuth } from "../../hooks/useAuth";

import clsx from "clsx";
import styles from "./AddColumnPlus.module.css";

export default function AddColumnPlus({ variant }) {
  const { user } = useAuth();

  return (
    <div
      className={clsx(
        styles.iconPlus,
        user?.theme === "violet"
          ? styles.iconViolet
          : user?.theme === "light"
          ? styles.iconLight
          : styles.iconDark
      )}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none">
        <path
          d="M10 4.16663V15.8333"
          stroke={user?.theme === "dark" ? "#121212" : "white"}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.16699 10H15.8337"
          stroke={user?.theme === "dark" ? "#121212" : "white"}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
