import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";

import { updateProjectAppearance } from "../../../redux/private/operationsPrivate";
import { refreshUser } from "../../../redux/auth/operationsAuth";
import { useAuth } from "../../../hooks/useAuth";

import clsx from "clsx";

import Input from "../../InputAdi/Input";
import Button from "../../commonComponents/Button/Button";

// import { FaPlus } from 'react-icons/fa';
import Sprite from "../../../images/projectIconsSprite.svg";
// import { Pointer } from 'lucide-react';
import image05 from "../../../images/bgImage-dark.jpg";
import { images } from "../../../utils/backgrounds";

import "./EditBoardForm.styled.css";
import ReusablePlus from "../../commonComponents/ReusablePlus/ReusablePlus";

export default function NewBoardForm({
  onClose,
  projectName,
  projectIcon,
  projectBackground,
}) {
  const { user } = useAuth();

  const formRef = useRef(null);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(projectName);
  const [icon, setIcon] = useState(projectIcon);
  const [background, setBackground] = useState(projectBackground);

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
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(`${projectName}`);
    console.log("Type of Project Name:", typeof projectName);
    console.log("Type of Project Name:", typeof `${projectName}`);

    if (!projectName) {
      console.error("Error: projectName is undefined or invalid!");
    } else {
      console.log("Dispatching update with:", {
        projectName,
        updates: {
          name: title || projectName,
          icon: icon || projectIcon,
          background: background || projectBackground,
        },
      });

      dispatch(
        updateProjectAppearance({
          projectName: `${projectName}`,
          updates: {
            name: title || projectName,
            icon: icon || projectIcon,
            background: background || projectBackground,
          },
        })
      );
    }

    // Timeout to delay `refreshUser` to give backend time to update
    setTimeout(() => {
      dispatch(refreshUser());
    }, 500); // Adjust timeout duration as necessary

    onClose();
  };

  return (
    <div className="modal-overlay-needed">
      <div
        ref={formRef}
        className={clsx(
          "modal-container-needed",
          user?.theme === "dark" ? "contDarked" : null
        )}>
        {/* Butonul de închidere */}
        <button type="button" className="close-btned" onClick={onClose}>
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
            "texted",
            user?.theme === "dark" ? "textDarked" : "texted"
          )}>
          Edit board
        </h2>
        <form onSubmit={handleSubmit} className="div-containered">
          <Input
            theme={user?.theme}
            value={title}
            handleChange={handleTitleChange}
            placeholder="Title"
            name="title"
            type="text"
          />
          <h3
            className={clsx(
              "titlesed",
              user?.theme === "dark" ? "titlesWhiteed" : null
            )}>
            Icons
          </h3>
          <div className="icon-containered">
            {[...Array(8)].map((_, index) => (
              <svg
                key={index}
                onClick={() => setIcon(index)}
                className={clsx(
                  "iconed",
                  user?.theme === "dark" ? "whiteed" : null
                )}>
                <use href={`${Sprite}#${index}`} />
              </svg>
            ))}
          </div>
          <div>
            <h3
              className={clsx(
                "titlesed",
                user?.theme === "dark" ? "titlesWhiteed" : null
              )}>
              Background
            </h3>
            <div className="image-containered">
              <div
                onClick={() => setBackground("none")}
                className="image-item"
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
                  className="image-itemed"
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
            className="btned"
            type="submit"
            theme={user?.theme}
            variant="send">
            <ReusablePlus />
            <span>Edit</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

// Define PropTypes for NewBoardForm
NewBoardForm.propTypes = {
  onClose: PropTypes.func.isRequired, // Function to close the form, required
  projectName: PropTypes.string.isRequired, // The name of the project, required
  projectIcon: PropTypes.number.isRequired,
  projectBackground: PropTypes.string.isRequired,
};
