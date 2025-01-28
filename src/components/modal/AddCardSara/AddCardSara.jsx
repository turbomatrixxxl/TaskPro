import React, { useState, useEffect, useRef } from "react";

import { useAuth } from "../../../hooks/useAuth";

import { useDispatch } from "react-redux";
import { refreshUser } from "../../../redux/auth/operationsAuth";
import { addTask } from "../../../redux/private/operationsPrivate";

import clsx from "clsx";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Input from "../../InputAdi/Input";
import Button from "../../commonComponents/Button";
import ReusablePlus from "../../commonComponents/ReusablePlus/ReusablePlus";

import { HiChevronDown, HiChevronUp } from "react-icons/hi";

import styles from "./AddCardSara.module.css";

export default function AddCard({ onClose, projectName, columnName }) {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const formRef = useRef(); // Ref for modal content
  const modalRef = useRef(); // Ref for modal overlay

  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedColor, setSelectedColor] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  const newDay = new Date(selectedDate).toISOString().split("T")[0];
  // console.log(newDay);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleColorSelect = (color) => setSelectedColor(color);

  const isFormValid =
    title.trim() !== "" && description.trim() !== "" && selectedColor !== null;

  const formData = {
    title: String(title),
    description: description ? String(description) : "Description",
    priority: selectedColor ? String(selectedColor) : "Without priority",
    dueDate: selectedDate ? newDay : today,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      // alert("Please fill in all fields and select a label color.");
      return;
    }
    // console.log("Form submitted", {
    //   title,
    //   description,
    //   newDay,
    //   selectedColor,
    // });

    // Dispatch the async thunk (addTask)
    dispatch(addTask({ projectName, columnName, taskData: formData }));

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

    // const handleClickOutside = (e) => {
    //   if (formRef.current && !formRef.current.contains(e.target)) {
    //     onClose();
    //   }
    // };

    document.addEventListener("keydown", handleEscapeKey);
    // document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      // document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Toggle the calendar open/close state when button is clicked
  const toggleCalendar = () => {
    setIsOpenCalendar((prev) => !prev);
  };

  // Prevent clicks inside modal content from closing it
  const handleModalClick = (e) => {
    e.stopPropagation(); // This prevents the click from bubbling up to the overlay
  };

  return (
    <div
      ref={modalRef}
      onClick={(e) => {
        if (!formRef.current.contains(e.target)) {
          onClose(); // Close modal if click is outside the form
        }
      }}
      className={styles["modal-overlay-need"]}>
      <div
        onClick={handleModalClick} // Prevent click inside modal content from triggering onClose
        ref={formRef}
        className={clsx(
          "modal-container-need",
          user?.theme === "dark" ? "contDark" : "modal-container-need"
        )}>
        <button type="button" className={styles["close-btn"]} onClick={onClose}>
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
          className={clsx(styles.text, {
            [styles.textDark]: user?.theme === "dark",
          })}>
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
            })}>
            Label color
          </div>

          <div className={styles["svg-circle"]}>
            <svg
              className={clsx(styles["circle-icon"], {
                [styles["circle-selected"]]: selectedColor === "Low",
              })}
              onClick={() => handleColorSelect("Low")}
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none">
              <circle cx="7" cy="7" r="7" fill="#8FA1D0" />
            </svg>
            <span
              className={clsx(
                styles.span,
                clsx(styles["label-text"], {
                  [styles["labelDark"]]: user?.theme === "dark",
                })
              )}>
              Low
            </span>
            <svg
              className={clsx(styles["circle-icon"], {
                [styles["circle-selected"]]: selectedColor === "Medium",
              })}
              onClick={() => handleColorSelect("Medium")}
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none">
              <circle cx="7" cy="7" r="7" fill="#E09CB5" />
            </svg>
            <span
              className={clsx(
                styles.span,
                clsx(styles["label-text"], {
                  [styles["labelDark"]]: user?.theme === "dark",
                })
              )}>
              Medium
            </span>
            <svg
              className={clsx(styles["circle-icon"], {
                [styles["circle-selected"]]: selectedColor === "High",
              })}
              onClick={() => handleColorSelect("High")}
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none">
              <circle cx="7" cy="7" r="7" fill="#BEDBB0" />
            </svg>
            <span
              className={clsx(
                styles.span,
                clsx(styles["label-text"], {
                  [styles["labelDark"]]: user?.theme === "dark",
                })
              )}>
              High
            </span>
            <svg
              className={clsx(styles["circle-icon"], {
                [styles["circle-selected"]]:
                  selectedColor === "Without priority",
              })}
              onClick={() => handleColorSelect("Without priority")}
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none">
              <circle cx="7" cy="7" r="7" fill="#808080" />
            </svg>
            <span
              className={clsx(
                styles.span,
                clsx(styles["label-text"], {
                  [styles["labelDark"]]: user?.theme === "dark",
                })
              )}>
              Without priority
            </span>
          </div>

          <div
            className={clsx(styles["label-text"], {
              [styles["labelDark"]]: user?.theme === "dark",
            })}>
            Deadline
          </div>

          <div
            onClick={toggleCalendar}
            className={clsx(styles.datepickerToggle, {
              "datepicker-toggle-dark": user?.theme === "dark",
            })}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className={clsx(
                styles["datepicker-input"],
                user.theme === "violet"
                  ? styles["datepicker-input-violet"]
                  : user.theme === "dark"
                  ? styles["datepicker-input-dark"]
                  : null
              )}
              calendarClassName={clsx(
                styles.datepickerCalendar,
                user?.theme === "dark"
                  ? styles.datepickerCalendarDark
                  : user?.theme === "violet"
                  ? styles.datepickerCalendarViolet
                  : null
              )}
              dateFormat="yyyy-MM-dd"
              minDate={today}
            />
            {isOpenCalendar ? (
              <HiChevronUp
                className={clsx(
                  styles.calendarArrow,
                  user?.theme === "light" || "dark"
                    ? styles.calendarArrowLight
                    : null
                )}
              />
            ) : (
              <HiChevronDown
                className={clsx(
                  styles.calendarArrow,
                  user?.theme === "light" || "dark"
                    ? styles.calendarArrowLight
                    : null
                )}
              />
            )}
          </div>

          <Button
            theme={user?.theme}
            className={styles.btn}
            type="submit"
            disabled={!isFormValid}
            variant="send">
            <ReusablePlus />
            Add
          </Button>
        </form>
      </div>
    </div>
  );
}
