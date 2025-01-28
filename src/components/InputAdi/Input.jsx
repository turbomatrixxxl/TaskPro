import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./Input.module.css";

export default function Input({
  type,
  placeholder,
  required,
  variant = "",
  className,
  name,
  handleChange,
  value,
  paddingLeft,
  autoComplete,
  handleBlur,
  isComment,
  theme,
}) {
  // Verifică dacă este un câmp de comentarii
  if (isComment) {
    return (
      <textarea
        onChange={handleChange}
        name={name || ""}
        className={clsx(
          styles.input, // Clasa generală pentru input
          styles.commentInput, // Clasa specifică pentru comentarii
          variant === "center" ? styles.inputCenter : styles.input,
          theme === "violet" ? styles.violetBorder : styles.input,
          theme === "dark" ? styles.darkColor : styles.normalColor,
          className
        )}
        placeholder={placeholder || ""}
        required={required || false}
        value={value || ""}
        onBlur={handleBlur}
      />
    );
  }

  // Dacă nu este câmp de comentarii, renderizează un input normal
  return (
    <input
      autoComplete={autoComplete || "off"}
      style={{ paddingLeft: paddingLeft || "18px" }}
      onChange={handleChange}
      name={name || ""}
      className={clsx(
        styles.input,
        styles.light, // Clasa generală pentru input
        variant === "center" ? styles.inputCenter : styles.input,
        theme === "violet" ? styles.violetBorder : styles.input,
        theme === "dark" ? styles.darkColor : styles.normalColor,
        className
      )}
      type={type || "text"}
      placeholder={placeholder || ""}
      required={required || false}
      value={value || ""}
      onBlur={handleBlur}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  theme: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  variant: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  handleChange: PropTypes.func,
  width: PropTypes.string,
  value: PropTypes.string,
  paddingLeft: PropTypes.string,
  autoComplete: PropTypes.string,
  handleBlur: PropTypes.func,
  isComment: PropTypes.bool,
};
