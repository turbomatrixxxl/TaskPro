import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { useAuth } from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { moveTask } from "../../../redux/private/operationsPrivate";
import { refreshUser } from "../../../redux/auth/operationsAuth";

import clsx from "clsx";

import styles from "./MoveCard.module.css";

export default function MoveCard({ projectName, columnName, taskName }) {
  const { user } = useAuth(); // Get user info from context
  const dispatch = useDispatch(); // Dispatch for Redux actions
  const moveRef = useRef(null); // Ref to detect clicks outside modal

  const [isMoveCardOpen, setIsMoveCardOpen] = useState(false); // Track if MoveCard is open

  const handleMoveIconClick = () => {
    setIsMoveCardOpen(true); // Open MoveCard for this task
  };

  const handleClose = () => {
    setIsMoveCardOpen(false); // Close MoveCard
  };
  // Close modal on "Escape" key or click outside
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        setIsMoveCardOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (moveRef.current && !moveRef.current.contains(e.target)) {
        setIsMoveCardOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle column selection
  const handleSelect = (toColumn) => {
    // console.log("projectName", projectName);
    // console.log("columnName", columnName);
    // console.log("taskName", taskName);
    // console.log("toColumn", toColumn);
    // console.log("Is true :", toColumn === columnName);

    if (toColumn !== columnName) {
      // Dispatch action to move the task
      dispatch(
        moveTask({
          projectName,
          columnName,
          taskName,
          toColumnName: toColumn,
        })
      );

      // Refresh user state with a slight delay to allow the backend to process
      setTimeout(() => {
        dispatch(refreshUser());
      }, 500);
    }

    // Close the modal after moving the task
    handleClose();
  };

  // Find the project by name in the user's project list
  const projectTarget = user?.projects?.find(
    (project) =>
      project.name.trim().toLowerCase() === projectName.trim().toLowerCase()
  );

  return (
    <div className={styles.moveMainCont}>
      <svg
        className={styles.move}
        onClick={handleMoveIconClick}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none">
        <g clipPath="url(#clip0_113_3368)">
          <path
            d="M2.22559 4.66683C3.37828 2.67416 5.53276 1.3335 8.00037 1.3335C11.6823 1.3335 14.667 4.31826 14.667 8.00016C14.667 11.6821 11.6823 14.6668 8.00037 14.6668C5.53276 14.6668 3.37828 13.3262 2.22559 11.3335"
            stroke={user.theme === "dark" ? "#fff" : "#161616"}
            strokeOpacity="0.5"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 10.6668L10.6667 8.00016L8 5.3335"
            stroke={user.theme === "dark" ? "#fff" : "#161616"}
            strokeOpacity="0.5"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.33301 8L10.6663 8"
            stroke={user.theme === "dark" ? "#fff" : "#161616"}
            strokeOpacity="0.5"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_113_3368">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
      {isMoveCardOpen && (
        <ul
          ref={moveRef}
          className={clsx(
            styles.moveCont,
            user.theme === "dark" && styles.contDark,
            user.theme === "violet" && styles.contViolet
          )}>
          {projectTarget?.columns?.map((column, columnIndex) => (
            <li
              onClick={() => {
                handleSelect(column.name);
              }}
              key={`move-${columnIndex + 1}`}
              className={clsx(
                styles.columnName,
                user.theme === "dark" && styles.columnNameDark,
                columnName === column.name
                  ? user.theme === "violet"
                    ? styles.selectedColumnNameViolet
                    : styles.selectedColumnName
                  : null
              )}>
              {column.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none">
                <g clipPath="url(#clip0_113_3368)">
                  <path
                    d="M2.22559 4.66683C3.37828 2.67416 5.53276 1.3335 8.00037 1.3335C11.6823 1.3335 14.667 4.31826 14.667 8.00016C14.667 11.6821 11.6823 14.6668 8.00037 14.6668C5.53276 14.6668 3.37828 13.3262 2.22559 11.3335"
                    stroke={clsx(
                      columnName === column.name
                        ? user.theme === "violet"
                          ? "#5255bc"
                          : "#bedbb0"
                        : user.theme === "dark"
                        ? "#FFFFFF80"
                        : "#161616"
                    )}
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 10.6668L10.6667 8.00016L8 5.3335"
                    stroke={clsx(
                      columnName === column.name
                        ? user.theme === "violet"
                          ? "#5255bc"
                          : "#bedbb0"
                        : user.theme === "dark"
                        ? "#FFFFFF80"
                        : "#161616"
                    )}
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1.33301 8L10.6663 8"
                    stroke={clsx(
                      columnName === column.name
                        ? user.theme === "violet"
                          ? "#5255bc"
                          : "#bedbb0"
                        : user.theme === "dark"
                        ? "#FFFFFF80"
                        : "#161616"
                    )}
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_113_3368">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// PropTypes for the component
MoveCard.propTypes = {
  projectName: PropTypes.string.isRequired,
  columnName: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-typos
  taskName: PropTypes.string,
};
