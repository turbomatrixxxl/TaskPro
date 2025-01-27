import React, { useState, useEffect, useRef } from "react";

import { useAuth } from "../../../hooks/useAuth";

import clsx from "clsx";

import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";

import Input from "../../InputAdi/Input";
import Button from "../../commonComponents/Button";
import ReusablePlus from "../../ReusablePlus/ReusablePlus";

import styles from "./AddCardSara.module.css";

export default function AddCard({ onClose }) {
  const { user } = useAuth();

  const formRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedColor, setSelectedColor] = useState(null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleColorSelect = (color) => setSelectedColor(color);

  const isFormValid =
    title.trim() !== "" &&
    description.trim() !== "" &&
    selectedColor !== null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Please fill in all fields and select a label color.");
      return;
    }
    console.log("Form submitted", { title, description, selectedDate, selectedColor });
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
    <div className={styles["modal-overlay-need"]}>
      <div
        ref={formRef}
        className={clsx(
          "modal-container-need",
          user?.theme === "dark" ? "contDark" : "modal-container-need"
        )}
      >
        <button type="button" className={styles["close-btn"]} onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
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
          className={clsx(styles.text, {
            [styles.textDark]: user?.theme === "dark",
          })}
        >
          Add card
        </h2>

        <form onSubmit={handleSubmit} className={styles["div-container"]}>
          <Input
            className={styles.textarea}
            theme={user?.theme}
            value={title}
            handleChange={handleTitleChange}
            placeholder="Title"
            name="title"
            type="text"
          />
          <Input
            className={styles.textarea}
            theme={user?.theme}
            value={description}
            handleChange={handleDescriptionChange}
            placeholder="Description"
            name="Description"
            type="text"
            isComment
          />

          <div
            className={clsx(styles["label-text"], {
              [styles["labelDark"]]: user?.theme === "dark",
            })}
          >
            Label color
          </div>

          <div className={styles["svg-circle"]}>
            <svg
              className={clsx(styles["circle-icon"], {
                [styles["circle-selected"]]: selectedColor === "low",
              })}
              onClick={() => handleColorSelect("low")}
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <circle cx="7" cy="7" r="7" fill="#8FA1D0" />
            </svg>
            <svg
              className={clsx(styles["circle-icon"], {
                [styles["circle-selected"]]: selectedColor === "medium",
              })}
              onClick={() => handleColorSelect("medium")}
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <circle cx="7" cy="7" r="7" fill="#E09CB5" />
            </svg>
            <svg
              className={clsx(styles["circle-icon"], {
                [styles["circle-selected"]]: selectedColor === "high",
              })}
              onClick={() => handleColorSelect("high")}
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <circle cx="7" cy="7" r="7" fill="#BEDBB0" />
            </svg>
            <svg
              className={clsx(styles["circle-icon"], {
                [styles["circle-selected"]]: selectedColor === "without",
              })}
              onClick={() => handleColorSelect("without")}
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <circle cx="7" cy="7" r="7" fill="#808080" />
            </svg>
          </div>

          <div
            className={clsx(styles["label-text"], {
              [styles["labelDark"]]: user?.theme === "dark",
            })}
          >
            Deadline
          </div>

          <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      className={clsx(styles["datepicker-input"])}
      calendarClassName={clsx(styles["datepicker-calendar"], {
        [styles["datepicker-calendar-dark"]]: user?.theme === "dark",
        [styles["datepicker-calendar-violet"]]: user?.theme === "violet",
      })}
      dateFormat="MMMM d, yyyy"
/>

          <Button
            theme={user?.theme}
            className={styles.btn}
            type="submit"
            disabled={!isFormValid}
            variant="send"
          >
            <ReusablePlus />
            
            Add
          </Button>
        </form>
      </div>
    </div>
  );
}
