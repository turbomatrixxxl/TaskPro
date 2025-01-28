import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";

import { useAuth } from "../../hooks/useAuth"; // Adjust the import path for your custom hook

import { filterUser } from "../../redux/private/privateSlice";

import clsx from "clsx";

import styles from "./Filters.module.css";

export default function Filters({ background }) {
  const { user } = useAuth(); // Get user info
  const dispatch = useDispatch();

  const [selectedFilter, setSelectedFilter] = useState(
    user?.filter ?? "Show all"
  );
  //   console.log(selectedFilter);

  const [isOpen, setIsOpen] = useState(false); // Controls dropdown open/close

  const dropdownRef = useRef(null); // Ref for dropdown to detect clicks outside

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown if click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterChange = (event) => {
    const newFilter = event.target.value; // Capture the new value
    setSelectedFilter(newFilter); // Update local state
    dispatch(filterUser(newFilter)); // Dispatch the updated value
    setIsOpen(false); // Close dropdown
  };

  const handleShowAll = () => {
    const defaultFilter = "Show all";
    setSelectedFilter(defaultFilter);
    dispatch(filterUser(defaultFilter));
    setIsOpen(false);
  };

  const getRadioBtnColor = (priority) => {
    if (priority === "Low") {
      return "#8FA1D0";
    }

    if (priority === "Medium") {
      return "#E09CB5";
    }

    if (priority === "High") {
      return "#BEDBB0";
    }

    return user?.theme === "dark"
      ? "rgba(255, 255, 255, 0.30)"
      : "rgba(22, 22, 22, 0.30)";
  };

  return (
    <div className={styles.selector} ref={dropdownRef}>
      {/* Display "Theme" when dropdown is closed */}

      <button
        className={clsx(
          styles.button,
          background !== "none"
            ? user.theme === "dark"
              ? styles.backgroundDark
              : styles.backgroundLight
            : null
        )}
        onClick={() => setIsOpen((prev) => !prev)}>
        <svg
          className={clsx(
            styles.svg,
            user?.theme === "dark" ? styles.svgDark : styles.svg
          )}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none">
          <path
            d="M14.6667 1H1.33337L6.66671 7.30667V11.6667L9.33337 13V7.30667L14.6667 1Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className={clsx(
            styles.span,
            user?.theme === "dark" ? styles.spanDark : styles.span
          )}>
          Filters
        </span>
      </button>

      {/* Dropdown options */}
      {isOpen && (
        <div
          className={clsx(
            styles.selections,
            user?.theme === "dark" ? styles.selectionsDark : styles.selections
          )}>
          <svg
            onClick={() => setIsOpen(false)}
            className={styles.close}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none">
            <path
              d="M13.5 4.5L4.5 13.5"
              stroke={user?.theme === "dark" ? "white" : "black"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.5 4.5L13.5 13.5"
              stroke={user?.theme === "dark" ? "white" : "black"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h3
            className={clsx(
              styles.titleName,
              user?.theme === "dark" ? styles.titleNameDark : styles.titleName
            )}>
            Filters
          </h3>

          <div
            className={clsx(
              styles.line,
              user?.theme === "dark" ? styles.lineDark : styles.line
            )}></div>

          <div className={styles.labelCont}>
            <strong
              className={clsx(
                styles.labelTitle,
                user?.theme === "dark"
                  ? styles.labelTitleDark
                  : styles.labelTitle
              )}>
              Label color
            </strong>
            <button
              onClick={handleShowAll}
              type="button"
              className={clsx(
                styles.showAllButton,
                user?.theme === "dark"
                  ? styles.showAllButtonDark
                  : styles.showAllButton,
                selectedFilter === "Show all"
                  ? user?.theme === "violet"
                    ? styles.showAllButtonCheckedViolet
                    : styles.showAllButtonChecked
                  : null
              )}>
              Show all
            </button>
          </div>
          <div className={styles.filterCont}>
            {/* Radio buttons for filtering */}
            {["Without priority", "Low", "Medium", "High"].map((option) => (
              <label
                key={option}
                className={clsx(
                  styles.option,
                  user?.theme === "dark" ? styles.optionDark : styles.option
                )}>
                <input
                  type="radio"
                  name="priority"
                  value={option}
                  checked={selectedFilter === option}
                  onChange={handleFilterChange}
                  className={styles.radioButton}
                  style={{
                    "--radio-color": getRadioBtnColor(option), // Pass the dynamic color
                  }}
                />
                <span className={clsx(styles.optionText)}>{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

Filters.propTypes = {
  background: PropTypes.string,
};
