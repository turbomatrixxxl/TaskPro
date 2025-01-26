import React from "react";

import { useAuth } from "../../hooks/useAuth";

import clsx from "clsx";
import styles from "./ReusablePlus.module.css";

export default function ReusablePlus() {
  const { user } = useAuth();

  return (
    <div
      className={clsx(
        styles.iconPlus,
        user?.theme === "violet" ? styles.iconViolet : styles.iconPlus
      )}
    >
      {user?.theme === "violet" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M10 4.16663V15.8333"
            stroke="#5255BC"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.16699 10H15.8337"
            stroke="#5255BC"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M10 4.16663V15.8333"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.1665 10H15.8332"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}
