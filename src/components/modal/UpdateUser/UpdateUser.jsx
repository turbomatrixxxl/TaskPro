import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../hooks/useAuth";
import {
  refreshUser,
  updateUserInfo,
  updateUserAvatar,
} from "../../../redux/auth/operationsAuth";
import clsx from "clsx";
import Input from "../../InputAdi/Input";
import Button from "../../commonComponents/Button";
import styles from "./UpdateUser.module.css";
import useToggle from "../../../hooks/useToggle";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

export default function UpdateUser({ onClose }) {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const formRef = useRef();
  const modalRef = useRef();
  const fileInputRef = useRef(null); // File input reference

  const [userNewName, setUserNewName] = useState(user?.username);
  const [userNewMail, setUserNewMail] = useState(user?.email);
  const [userNewPassword, setUserNewPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [type, setType] = useState("password");
  const [eyeVisible, toggleEyeVisible] = useToggle(true);
  const [closedEyeVisible, toggleClosedEyeVisible] = useToggle(false);

  const handleUserNameChange = (e) => setUserNewName(e.target.value);
  const handleUserMailAddressChange = (e) => setUserNewMail(e.target.value);
  const handleUserPasswordChange = (e) => setUserNewPassword(e.target.value);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);

      const formData = new FormData();
      formData.append("avatar", file);

      dispatch(updateUserAvatar(formData)); // Dispatch action to update avatar
    }

    setTimeout(() => {
      dispatch(refreshUser());
    }, 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateUserInfo({
        username: userNewName,
        email: userNewMail,
        password: userNewPassword,
      })
    );

    setTimeout(() => {
      dispatch(refreshUser());
    }, 500);

    onClose();
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  const handleModalClick = (e) => e.stopPropagation();

  // Set correct avatar URL
  const imageUrl = selectedFile
    ? URL.createObjectURL(selectedFile)
    : user?.avatarURL
    ? user?.avatarURL.startsWith("http")
      ? user?.avatarURL
      : `https://taskpro-nodejs.onrender.com/${user.avatarURL}`
    : "/default-avatar.png"; // Default fallback image

  return (
    <div
      ref={modalRef}
      onClick={(e) => {
        if (!formRef.current.contains(e.target)) {
          onClose();
        }
      }}
      className={styles["modal-overlay-need"]}>
      <div
        onClick={handleModalClick}
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
          Edit profile
        </h2>

        {/* Profile Image Section */}
        <div
          className={clsx(
            styles.imgCont,
            user?.theme === "violet" ? styles.imgContViolet : null
          )}>
          <img className={styles.userImg} src={imageUrl} alt="User Avatar" />
          <div className={styles.imgPlusCont}>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <button
              className={clsx(
                styles.imgPlusBtn,
                user?.theme === "violet"
                  ? styles.iconPlusViolet
                  : styles.iconPlus
              )}
              onClick={() => fileInputRef.current.click()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none">
                <path
                  d="M10 4.16663V15.8333"
                  stroke={user.theme === "violet" ? "white" : "#121212"}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.16699 10H15.8337"
                  stroke={user.theme === "violet" ? "white" : "#121212"}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles["div-container"]}>
          <Input
            className={styles.textarea}
            theme={user?.theme}
            value={userNewName}
            handleChange={handleUserNameChange}
            placeholder="Name"
            name="title"
            type="text"
          />

          <Input
            className={styles.textarea}
            theme={user?.theme}
            value={userNewMail}
            handleChange={handleUserMailAddressChange}
            placeholder="Email"
            name="Email"
            type="text"
          />

          <div className={styles.inputWrapper}>
            {eyeVisible && (
              <VscEye
                onClick={() => {
                  toggleEyeVisible();
                  toggleClosedEyeVisible();
                  setType("text");
                }}
                size="24px"
                className={clsx(
                  styles.eyeIcon,
                  user?.theme === "dark" ? styles.eyeIconDark : null
                )}
              />
            )}
            {closedEyeVisible && (
              <VscEyeClosed
                onClick={() => {
                  toggleEyeVisible();
                  toggleClosedEyeVisible();
                  setType("password");
                }}
                size="24px"
                className={clsx(
                  styles.eyeIcon,
                  user?.theme === "dark" ? styles.eyeIconDark : null
                )}
              />
            )}
            <Input
              className={styles.textarea}
              value={userNewPassword}
              theme={user?.theme}
              handleChange={handleUserPasswordChange}
              placeholder="New password"
              name="Password"
              type={type}
            />
          </div>

          <Button
            theme={user?.theme}
            className={styles.btn}
            type="submit"
            variant="send">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
