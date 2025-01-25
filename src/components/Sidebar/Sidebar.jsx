import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { useAuth } from "../../hooks/useAuth";
import useToggle from "../../hooks/useToggle";
import { logOut } from "../../redux/auth/operationsAuth";
import { reset } from "../../redux/auth/authSlice";

import clsx from "clsx";

import Button from "../commonComponents/Button";
import Modal from "../commonComponents/Modal/Modal";

import logoSmall from "../../images/cactus.png";
import logoBig from "../../images/cactus@2x.png";

import ProjectsLinks from "../ProjectsLinks/ProjectsLinks";
import MyBoardsSection from "../MyBoardsSection";
import LogoSection from "../LogoSection/LogoSection";
import NeedHelpSection from "../NeedHelpSection/NeedHelpSection";

import styles from "./Sidebar.module.css";

const breakpoints = {
  mobile: "(max-width: 767px)",
  tablet: "(min-width:768px)",
};

export default function Sidebar({ sideBarRef }) {
  const { user } = useAuth();
  const [isLogoutModalVisible, toggleIsLogoutModalVisible] = useToggle(false);
  const modalRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ query: breakpoints.mobile });

  const imageUrl = user?.avatarURL?.startsWith("http")
    ? user.avatarURL
    : `https://taskpro-nodejs.onrender.com/${user.avatarURL}`;

  const handleLogout = async () => {
    try {
      await dispatch(logOut()).unwrap(); // Ensure logout is successful
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(reset()); // Clear the store after logout
    }
  };

  useEffect(() => {
    if (isLogoutModalVisible) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") toggleIsLogoutModalVisible();
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.body.classList.remove(styles.noScroll);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isLogoutModalVisible, toggleIsLogoutModalVisible]);

  const closeOnClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      toggleIsLogoutModalVisible();
    }
  };

  return (
    <aside
      ref={sideBarRef}
      className={clsx(
        styles.cont,
        user?.theme === "dark"
          ? styles.asideDark
          : user?.theme === "violet"
          ? styles.asideViolet
          : styles.asideLight
      )}>
      {isLogoutModalVisible && (
        <div
          ref={modalRef}
          className={styles.modalOverlay}
          onClick={closeOnClickOutside}>
          <div className={styles.modalContent}>
            <Modal
              variant={user?.theme}
              closeButton={styles.closeButton}
              handleModalClose={toggleIsLogoutModalVisible}
              isModalVisible={isLogoutModalVisible}>
              {isMobile && (
                <header
                  className={clsx(
                    styles.modalHeader,
                    user?.theme === "dark"
                      ? styles.modalHeaderDark
                      : user?.theme === "violet"
                      ? styles.modalHeaderViolet
                      : styles.modalHeaderLight
                  )}>
                  <div
                    className={clsx(
                      styles.userContainer,
                      user?.theme === "dark"
                        ? styles.userContainerDark
                        : styles.userContainer
                    )}>
                    <p>{user ? user.username : "User"}</p>
                    <img
                      src={imageUrl}
                      alt="User Avatar"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                </header>
              )}
              <div className={styles.modalLogoutActionCenter}>
                <img
                  className={styles.logo}
                  src={isMobile ? logoSmall : logoBig}
                  alt="cactus logo"
                />
                <p
                  className={clsx(
                    styles.question,
                    user?.theme === "dark"
                      ? styles.questionDark
                      : styles.question
                  )}>
                  Are you sure you want to log out?
                </p>
                <div className={styles.modalButtonsContainer}>
                  <Button
                    handleClick={() => {
                      toggleIsLogoutModalVisible();
                      handleLogout();
                      navigate("/home");
                    }}
                    type="button"
                    variant="auth">
                    Logout
                  </Button>
                  <Button
                    variant="auth"
                    handleClick={toggleIsLogoutModalVisible}
                    type="button">
                    Cancel
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      )}
      <div className={styles.projectsCont}>
        <LogoSection />
        <MyBoardsSection />
        <nav className={styles.projectsNav}>
          {user?.projects?.length > 0 &&
            user?.projects.map((project, index) => {
              console.log(project); // Log each project for debugging

              return (
                <ProjectsLinks
                  editDelete={project?.name}
                  key={project?._id || index}
                  to={`/home/${project?.name}`}
                  projectName={project?.name}
                  icon={Number(project?.icon)}
                  theme={user?.theme}
                  projectBackground={String(project?.background) || "none"} // Default to "none" if background is undefined
                />
              );
            })}
        </nav>
      </div>
      <NeedHelpSection />
      <button
        onClick={toggleIsLogoutModalVisible}
        className={styles.logoutButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none">
          <path
            d="M11.8667 10.0798C12.28 5.27982 14.7467 3.31982 20.1467 3.31982H20.32C26.28 3.31982 28.6667 5.70649 28.6667 11.6665V20.3598C28.6667 26.3198 26.28 28.7065 20.32 28.7065H20.1467C14.7867 28.7065 12.32 26.7732 11.88 22.0532"
            stroke={user?.theme === "violet" ? "white" : "#BEDBB0"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.6665 16H19.8398"
            stroke={user?.theme === "violet" ? "white" : "#BEDBB0"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.8667 11.5332L21.3334 15.9999L16.8667 20.4665"
            stroke={user?.theme === "violet" ? "white" : "#BEDBB0"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className={clsx(
            styles.logoutButtonSpan,
            user?.theme === "light"
              ? styles.logoutButtonSpanLight
              : styles.logoutButtonSpan
          )}>
          Log out
        </span>
      </button>
    </aside>
  );
}
