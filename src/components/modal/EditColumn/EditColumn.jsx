import React, { useEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";
import { useAuth } from "../../../hooks/useAuth";
import Input from "../../InputAdi/Input";
import Button from "../../commonComponents/Button/Button";
import "./EditColumn.styled.css";
import clsx from "clsx";

export default function AddColumn({ onClose }) {
  const { user } = useAuth();
  const formRef = useRef(null);
  // const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);
  const debounceRef = useRef(null);

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
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const normalizedTitle = value.trim().toLowerCase();
      const projectExists = user?.projects?.some(
        (project) => project.name.trim().toLowerCase() === normalizedTitle
      );
      setIsDuplicate(projectExists);
    }, 300);
  };

  // Submit formular
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isDuplicate || title.trim() === "") return;

    // Aici trimiteți acțiunea de adăugare proiect
    // dispatch(addProject({ name: title }));

    // După trimitere, închideți modalul
    onClose();
  };

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
        <h2
          className={clsx(
            "text",
            user?.theme === "dark" ? "textDark" : "text"
          )}>
          Edit column
        </h2>
        <form className="div-container" onSubmit={handleSubmit}>
          <Input
            theme={user?.theme}
            value={title}
            handleChange={handleTitleChange}
            placeholder="To Do"
            name="ToDo"
            type="text"
          />
          {isDuplicate && (
            <p className="error">
              A project with this name already exists! Please choose another
              name.
            </p>
          )}
          <Button
            className="btn"
            type="submit"
            theme={user?.theme}
            variant="send"
            disabled={isDuplicate || title.trim() === ""}>
            Add
          </Button>
        </form>
      </div>
    </div>
  );
}
