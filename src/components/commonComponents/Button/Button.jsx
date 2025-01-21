import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";

import styles from "./Button.module.css";

export default function Button({
  type,
  children,
  variant = "",
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
        variant === "auth"
          ? styles.button
          : variant === "violet"
            ? styles.violet
            : variant === "dark" ? styles.dark : variant === "light" ?? styles.light,
        className
      )}
    >
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
