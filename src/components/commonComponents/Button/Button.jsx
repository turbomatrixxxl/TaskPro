import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";

import styles from "./Button.module.css";

export default function Button({
  type,
  children,
  variant = "",
  theme = "light",
  handleClick,
  disabled,
  className,
}) {
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      type={type}
      className={clsx(
        styles.button,
        variant === "auth"
          ? styles.button
          : variant === "send"
          ? theme === "violet"
            ? styles.violet
            : styles.button
          : null, // If no match, fallback to no additional styles
        className // Allow additional custom classes
      )}>
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  handleClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  className: PropTypes.string,
};
