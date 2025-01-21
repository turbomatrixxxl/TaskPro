import React, { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import Link
import { logOut } from "../../redux/auth/operationsAuth";
import { useAuth } from "../../hooks/useAuth";

import Modal from "../commonComponents/Modal/Modal";
import useToggle from "../../hooks/useToggle";

import Button from "../commonComponents/Button";


import styles from "./UserLogout.module.css";
import clsx from "clsx";

const breakpoints = {
  mobile: "(max-width: 767px)",
  tablet: "(min-width:768px)",
};

export default function UserLogout() {
  const { isLoggedIn, user } = useAuth();
  // console.log(user.theme);


  const [isLogoutModalVisible, toggleIsLogoutModalVisible] = useToggle(false);
  const modalRef = useRef();
  // console.log(user);

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logOut());
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
    if (event.target !== event.currentTarget) {
      toggleIsLogoutModalVisible();
    }
  };

  const isMobile = useMediaQuery({ query: breakpoints.mobile });
  // const isTablet = useMediaQuery({ query: breakpoints.tablet });

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <div className={styles.cont}>
        <p>{user ? user.username ?? user.name : "User"}</p>
        <span>|</span>
        <Button handleClick={toggleIsLogoutModalVisible}>Logout</Button>
      </div>

      {isLogoutModalVisible && (
        <div
          ref={modalRef}
          className={styles.modalOverlay}
          onClick={closeOnClickOutside}
        >
          <div className={styles.modalContent}>
            <Modal variant={`${user?.theme}`}
              closeButton={styles.closeButton}
              handleModalClose={toggleIsLogoutModalVisible}
              isModalVisible={isLogoutModalVisible}
            >
              {isMobile && (
                <header className={styles.modalHeader}>
                  <div className={styles.userContainer}>
                    <p>{user ? user.data?.username : "User"}</p>
                    <span>|</span>
                    <Button
                      handleClick={toggleIsLogoutModalVisible}
                    >Logout</Button>
                  </div>
                </header>
              )}
              <div className={styles.modalLogoutActionCenter}>

                <p className={clsx(styles.question, user?.theme === "dark" ? styles.questionDark : styles.question)}>
                  Are you sure you want to log out?
                </p>
                <div className={styles.modalButtonsContainer}>

                  <Button
                    handleClick={() => {
                      toggleIsLogoutModalVisible();
                      handleLogout();
                      navigate("/home")
                    }}
                    type="button"
                    variant="auth"
                  >
                    Logout
                  </Button>

                  <Button
                    variant="auth"
                    handleClick={toggleIsLogoutModalVisible}
                    type="button"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
}
