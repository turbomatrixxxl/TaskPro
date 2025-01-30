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

import {
  clearIsRegistered,
  clearUpdateUser,
  reset,
} from "../../redux/auth/authSlice";
import { resetHelpForm } from "../../redux/public/helpSlice";
import { clearUser } from "../../redux/private/privateSlice";

import styles from "./SharedLayout.module.css";

function SharedLayout({ handleClick }) {
  const {
    isLoggedIn,
    isLoggedOut,
    errorAuth,
    isRegistered,
    user,
    emailResendStatus,
  } = useAuth();
  const { privateError, privateMessage } = usePrivate();
  const { helpError, helpSuccessMessage } = usePublic();

  const dispatch = useDispatch();

  const [logoutShown, setLogoutShown] = useState(false);

  useEffect(() => {
    if (isRegistered) {
      toast.success("Registration successful!");

      dispatch(clearIsRegistered());
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

    if (emailResendStatus) {
      toast.success(emailResendStatus);

      dispatch(clearUpdateUser());
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
    emailResendStatus,
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
