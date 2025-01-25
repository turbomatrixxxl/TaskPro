import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { deleteProject } from "../../../redux/private/operationsPrivate";
import { refreshUser } from "../../../redux/auth/operationsAuth";

import { useAuth } from "../../../hooks/useAuth";

import clsx from "clsx";

import Button from "../../commonComponents/Button";

import "./DeleteProject.styled.css";

export default function NeedHelp({ onClose, projectName }) {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const formRef = useRef(null);

  const handleDelete = (e) => {
    dispatch(deleteProject({ projectName: `${projectName}` }));

    // Timeout to delay `refreshUser` to give backend time to update
    setTimeout(() => {
      dispatch(refreshUser());
    }, 500); // Adjust timeout duration as necessary

    onClose();
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay-need">
      <div
        ref={formRef}
        className={clsx(
          "modal-container-need",
          user?.theme === "dark" ? "contDark" : "modal-container-need"
        )}>
        <button type="button" className="close-btn" onClick={onClose}>
          <svg
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
        </button>

        <p
          className={clsx(
            "text",
            user?.theme === "dark" ? "textDark" : "text"
          )}>
          Are you sure that you want to delete
        </p>

        <h2
          className={clsx(
            "text",
            user?.theme === "dark" ? "textDark" : "text"
          )}>
          {projectName}
        </h2>

        <p
          className={clsx(
            "text",
            user?.theme === "dark" ? "textDark" : "text"
          )}>
          an it's contents...?
        </p>

        <Button
          handleClick={handleDelete}
          theme={user?.theme}
          className="btn"
          type="submit"
          variant="send">
          Delete
        </Button>

        <Button
          handleClick={() => {
            onClose();
          }}
          theme={user?.theme}
          className="btn"
          type="submit"
          variant="send">
          Cancel
        </Button>
      </div>
    </div>
  );
}
