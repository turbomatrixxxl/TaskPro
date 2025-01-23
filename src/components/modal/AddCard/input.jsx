import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./input.css"; // Asigură-te că fișierul CSS există și stilurile sunt corecte

export default function Input({
  type,
  placeholder,
  required,
  variant = "",
  className,
  name,
  handleChange,
  width,
  value,
  paddingLeft,
  autoComplete,
  handleBlur,
}) {
  return (
    <div style={{ width: width || "100%" }} className={styles.inputContainerAdd}>
      {/* Verifică dacă tipul este 'textarea'. Dacă este, va returna un textarea în loc de un input */}
      {type === "textarea" ? (
  <textarea
    autoComplete={autoComplete || "off"}
    style={{ paddingLeft: paddingLeft || "18px" }}
    onChange={handleChange}
    name={name || ""}
    className={clsx(
      styles.inputAdd, // Stilul general pentru input
      styles.textareaAdd, // Stilul specific pentru textarea
      className,
      variant === "center" ? styles.inputCenterAdd : styles.input
    )}
    placeholder={placeholder || ""}
    required={required || false}
    value={value || ""}
    onBlur={handleBlur}
  />
) : (
  <input
    autoComplete={autoComplete || "off"}
    style={{ paddingLeft: paddingLeft || "18px" }}
    onChange={handleChange}
    name={name || ""}
    className={clsx(
      styles.inputAdd,
      className,
      variant === "center" ? styles.inputCenterAdd : styles.input
    )}
    type={type || "text"}
    placeholder={placeholder || ""}
    required={required || false}
    value={value || ""}
    onBlur={handleBlur}
  />
)}

    </div>
  );
}

Input.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // Lățimea inputului
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // Valoarea inputului
  paddingLeft: PropTypes.string, // Marginea din stânga
  autoComplete: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]), // Autocompletare
  name: PropTypes.string, // Numele inputului
  type: PropTypes.string, // Tipul inputului (poate fi 'text' sau 'textarea')
  variant: PropTypes.string, // Variantă pentru stil (ex: 'center' pentru centrare)
  handleChange: PropTypes.func, // Funcția care va gestiona schimbările de valoare
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]), // Indică dacă inputul este obligatoriu
  placeholder: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // Placeholder-ul inputului
};
