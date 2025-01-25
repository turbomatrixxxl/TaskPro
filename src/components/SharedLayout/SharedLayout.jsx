import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// import { useMediaQuery } from "react-responsive";

import { Outlet } from "react-router-dom";

import Footer from "../Footer/Footer";
import Header from "../Header";

import { useAuth } from "../../hooks/useAuth";
import { usePrivate } from "../../hooks/usePrivate";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import clsx from "clsx";

import clsx from "clsx";

// import ScreenPage from "../../pages/ScreenPage";

import { usePublic } from "../../hooks/usePublic";
import { useDispatch } from "react-redux";

import styles from "./SharedLayout.module.css";
import { reset } from "../../redux/auth/authSlice";
import { resetHelpForm } from "../../redux/public/helpSlice";
import { clearUser } from "../../redux/private/privateSlice";

function SharedLayout({ handleClick }) {
  const { isLoggedIn, isLoggedOut, errorAuth, isRegistered, user } = useAuth();
  const { privateError, privateMessage } = usePrivate();
  const { helpError, helpSuccessMessage } = usePublic();

  const dispatch = useDispatch();

  const [toastRegisteredShown, setToastRegisteredShown] = useState(false);
  const [logoutShown, setLogoutShown] = useState(false);

  useEffect(() => {
    if (!toastRegisteredShown) {
    }
    if (isRegistered) {
      toast.success("Registration successful!");
      setToastRegisteredShown(true);
    }

    if (!logoutShown) {
      if (isLoggedOut) {
        toast.success("Logout successful!");
        setLogoutShown(true);
        dispatch(reset());
      }
    }

    if (helpSuccessMessage) {
      toast.success(helpSuccessMessage);
    }

    if (helpError) {
      toast.success(helpError);
      dispatch(resetHelpForm());
    }

    if (errorAuth) {
      toast.error(errorAuth);
    }

    if (privateError) {
      toast.error(privateError);
    }

    if (privateMessage) {
      toast.success(privateMessage);
    }

    setTimeout(() => {
      dispatch(resetHelpForm());
    }, 7000);

    setTimeout(() => {
      dispatch(clearUser());
    }, 5000);
  }, [
    isRegistered,
    isLoggedIn,
    isLoggedOut,
    toastRegisteredShown,

    logoutShown,
    helpSuccessMessage,
    helpError,
    errorAuth,
    privateError,
    privateMessage,
    dispatch,
  ]);

  return (
    <div className={styles.cont}>
      <Header handleClick={handleClick} />

      <main
        className={clsx(
          styles.main,
          user?.theme === "dark"
            ? styles.mainDark
            : user?.theme === "violet"
            ? styles.mainViolet
            : user?.theme === "light"
            ? styles.mainLight
            : styles.mainLight
        )}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

SharedLayout.propTypes = {
  handleClick: PropTypes.func,
};

export default SharedLayout;
