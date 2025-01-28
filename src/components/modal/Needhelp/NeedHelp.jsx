import React, { useState, useEffect, useRef } from "react";

import { useAuth } from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { sendHelpEmail } from "../../../redux/public/operationsHelp";

import clsx from "clsx";

import Input from "../../InputAdi/Input";
import Button from "../../commonComponents/Button";

import "./NeedHelp.styled.css";

export default function NeedHelp({ onClose }) {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const formRef = useRef(null);

  const [email, setEmail] = useState(user?.email || "");
  const [description, setDescription] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const isFormValid = email.trim() !== "" && description.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      dispatch(sendHelpEmail({ email, comment: description }));
      onClose();
    }
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

        <h2
          className={clsx(
            "text",
            user?.theme === "dark" ? "textDark" : "text"
          )}>
          Need help
        </h2>

        <form onSubmit={handleSubmit} className="div-container">
          <Input
            theme={user?.theme}
            value={email}
            handleChange={handleEmailChange}
            placeholder="Email address"
            name="email"
            type="email"
          />
          <Input
            className="textarea"
            theme={user?.theme}
            value={description}
            handleChange={handleDescriptionChange}
            placeholder="Comment"
            name="Comment"
            type="text"
            isComment
          />

          <Button
            theme={user?.theme}
            className="btn"
            type="submit"
            disabled={!isFormValid}
            variant="send">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
