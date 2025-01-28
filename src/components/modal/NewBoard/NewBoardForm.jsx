import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { addProject } from "../../../redux/private/operationsPrivate";
import { refreshUser } from "../../../redux/auth/operationsAuth";
import { useAuth } from "../../../hooks/useAuth";

import Input from "../../InputAdi/Input";
import Button from "../../commonComponents/Button/Button";

import Sprite from "../../../images/projectIconsSprite.svg";
import image05 from "../../../images/bgImage-dark.jpg";
import { images } from "../../../utils/backgrounds";

import "./NewBoardForm.styled.css";
import clsx from "clsx";
import ReusablePlus from "../../commonComponents/ReusablePlus/ReusablePlus";

export default function NewBoardForm({ onClose }) {
  const { user } = useAuth();
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [background, setBackground] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);

  const debounceRef = useRef(null);

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

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);

    // Debounce the duplicate check
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const normalizedTitle = value.trim().toLowerCase();
      const projectExists = user?.projects?.some(
        (project) => project.name.trim().toLowerCase() === normalizedTitle
      );
      setIsDuplicate(projectExists);
    }, 300); // Adjust debounce duration as needed
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addProject({
        name: title, // No fallback; the title must be provided
        icon: icon === "" ? 0 : icon,
        background: background === "" ? "none" : background,
      })
    );

    // Timeout to delay `refreshUser` to give backend time to update
    setTimeout(() => {
      dispatch(refreshUser());
    }, 500);

    onClose();
  };

  return (
    <div className="modal-overlay-neednb">
      <div
        ref={formRef}
        className={clsx(
          "modal-container-neednb",
          user?.theme === "dark" ? "contDarknb" : null
        )}>
        <button type="button" className="close-btnnb" onClick={onClose}>
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
            "textnb",
            user?.theme === "dark" ? "textDarknb" : null
          )}>
          New board
        </h2>
        <form onSubmit={handleSubmit} className="div-containernb">
          <Input
            theme={user?.theme}
            value={title}
            handleChange={handleTitleChange}
            placeholder="Title"
            name="title"
            type="text"
          />
          {isDuplicate && (
            <p className="errornb">
              A project with this name already exists ! Please choose another
              name for the project !
            </p>
          )}
          <h3
            className={clsx(
              "titlesnb",
              user?.theme === "dark" ? "titlesWhitenb" : null
            )}>
            Icons
          </h3>
          <div className="icon-containernb">
            {[...Array(8)].map((_, index) => (
              <svg
                key={index}
                onClick={() => setIcon(index)}
                className={clsx(
                  "iconnb",
                  user?.theme === "dark" ? "whitenb" : null
                )}>
                <use href={`${Sprite}#${index}`} />
              </svg>
            ))}
          </div>
          <div>
            <h3
              className={clsx(
                "titlesnb",
                user?.theme === "dark" ? "titlesWhitenb" : null
              )}>
              Background
            </h3>
            <div className="image-containernb">
              <div
                onClick={() => setBackground("none")}
                className="image-itemnb"
                style={{
                  backgroundImage: `url(${image05})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  cursor: "pointer",
                }}></div>
              {images.map((image, index) => (
                <div
                  onClick={() => setBackground(`${index}`)}
                  key={index}
                  className="image-itemnb"
                  style={{
                    backgroundImage: `url(${image.jpgVersion || image.min})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    cursor: "pointer",
                  }}></div>
              ))}
            </div>
          </div>
          <Button
            className="btnnb"
            type="submit"
            theme={user?.theme}
            variant="send"
            disabled={isDuplicate || title.trim() === ""} // Disable button for invalid input
          >
            <ReusablePlus />
            <span>Create</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
