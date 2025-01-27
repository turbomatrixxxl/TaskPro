import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";

import { useAuth } from "../../../hooks/useAuth";
import { addColumn } from "../../../redux/private/operationsPrivate";
import { refreshUser } from "../../../redux/auth/operationsAuth";

import clsx from "clsx";

import Input from "../../InputAdi/Input";
import Button from "../../commonComponents/Button/Button";
import ReusablePlus from "../../commonComponents/ReusablePlus/ReusablePlus";

import "./AddColumn.styled.css";

export default function AddColumn({ onClose, projectName }) {
  const { user } = useAuth();
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const [columnName, setColumnName] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);
  // const debounceRef = useRef(null);

  // Event listeners pentru Escape și click în afara modalului
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

  // Verificare pentru titluri duplicate cu debounce
  const handleAddName = (e) => {
    const value = e.target.value;
    setColumnName(value);

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

    if (isDuplicate || columnName.trim() === "") return;

    // Aici trimiteți acțiunea de adăugare proiect
    dispatch(addColumn({ projectName, columnName }));

    // Timeout to delay `refreshUser` to give backend time to update
    setTimeout(() => {
      dispatch(refreshUser());
    }, 500); // Adjust timeout duration as necessary

    // După trimitere, închideți modalul
    onClose();
  };

  return (
    <div className="modal-overlay-needac">
      <div
        ref={formRef}
        className={clsx(
          "modal-container-needac",
          user?.theme === "dark" ? "contDarkac" : null
        )}>
        <button type="button" className="close-btnac" onClick={onClose}>
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
            "textac",
            user?.theme === "dark" ? "textDarkac" : null
          )}>
          Add column
        </h2>
        <form className="div-containerac" onSubmit={handleSubmit}>
          <Input
            theme={user?.theme}
            value={columnName}
            handleChange={handleAddName}
            placeholder="Title"
            name="title"
            type="text"
          />
          {isDuplicate && (
            <p className="errorac">
              A column with this name already exists! Please choose another
              name.
            </p>
          )}
          <Button
            className="btnac"
            type="submit"
            theme={user?.theme}
            variant="send"
            disabled={isDuplicate || columnName.trim() === ""}>
            <ReusablePlus />
            <span>Add</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

AddColumn.propTypes = {
  onClose: PropTypes.func.isRequired, // Function to close the modal
  projectName: PropTypes.string.isRequired, // Name of the project as a string
};
