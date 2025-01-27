import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { useAuth } from "../../../hooks/useAuth";
import Input from "../../InputAdi/Input";
import Button from "../../commonComponents/Button/Button";
import "./EditColumn.styled.css";
import clsx from "clsx";
import { refreshUser } from "../../../redux/auth/operationsAuth";
import { updateColumn } from "../../../redux/private/operationsPrivate";

export default function AddColumn({ onClose, columnName, projectName }) {
  const { user } = useAuth();
  const formRef = useRef(null); // Ref for modal content
  const modalRef = useRef(null); // Ref for modal overlay
  const dispatch = useDispatch();
  const [newColumnName, setNewColumnName] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);

  // console.log(projectName);
  // console.log(columnName);

  // Event listeners for Escape and click outside modal
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      // Check if the click is outside of modal content
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        console.log("Outside click detected");
        // onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleClickOutside); // Listen for mousedown

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Verificare pentru titluri duplicate
  const handleAddName = (e) => {
    const value = e.target.value;
    setNewColumnName(value);

    const normalizedTitle = value.trim().toLowerCase();
    const columnExists = user?.projects
      ?.find((project) => project.name === projectName)
      ?.columns.some(
        (column) => column.name.trim().toLowerCase() === normalizedTitle
      );

    setIsDuplicate(columnExists);
  };

  // Submit formular
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isDuplicate || newColumnName.trim() === "") return;

    dispatch(updateColumn({ projectName, columnName, newColumnName }));

    setTimeout(() => {
      dispatch(refreshUser());
    }, 500); // Adjust timeout duration as necessary

    onClose();
  };

  // Prevent clicks inside modal content from closing it
  const handleModalClick = (e) => {
    e.stopPropagation(); // This prevents the click from bubbling up to the overlay
  };

  return (
    <div
      ref={modalRef}
      className="modal-overlay-needec"
      onClick={(e) => {
        if (!formRef.current.contains(e.target)) {
          onClose(); // Close modal if click is outside the form
        }
      }}>
      <div
        ref={formRef}
        className={clsx(
          "modal-container-needec",
          user?.theme === "dark" ? "contDarkec" : "modal-container-needec"
        )}
        onClick={handleModalClick} // Prevent click inside modal content from triggering onClose
      >
        <button type="button" className="close-btnec" onClick={onClose}>
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
        <h2
          className={clsx(
            "textec",
            user?.theme === "dark" ? "textDarkec" : null
          )}>
          Edit column
        </h2>
        <form className="div-containerec" onSubmit={handleSubmit}>
          <Input
            className={user?.theme !== "dark" ? "notDark" : null}
            theme={user?.theme}
            value={newColumnName}
            handleChange={handleAddName}
            placeholder={`Initial name: ${columnName || "Untitled Column"}`}
            name="ToDo"
            type="text"
          />
          {isDuplicate && (
            <p className="errorec">
              A project with this name already exists! Please choose another
              name.
            </p>
          )}
          <Button
            className="btnec"
            type="submit"
            theme={user?.theme}
            variant="send"
            disabled={isDuplicate || newColumnName.trim() === ""}>
            Add
          </Button>
        </form>
      </div>
    </div>
  );
}

AddColumn.propTypes = {
  onClose: PropTypes.func.isRequired, // Function to close the modal
  projectName: PropTypes.string.isRequired, // Name of the project as a string
  columnName: PropTypes.string.isRequired,
};
