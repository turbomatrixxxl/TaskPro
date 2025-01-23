import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// import { useMediaQuery } from "react-responsive";

import { Outlet } from "react-router-dom";

import Footer from "../Footer/Footer";
import Header from "../Header";


import { useAuth } from "../../hooks/useAuth";
import { usePrivate } from "../../hooks/usePrivate";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import clsx from "clsx";

import clsx from "clsx";

// import ScreenPage from "../../pages/ScreenPage";

import styles from "./SharedLayout.module.css";

function SharedLayout({ handleClick }) {
  const { isLoggedIn, isLoggedOut, errorAuth, user } = useAuth();
  const { message } = usePrivate();

  const [toastShown, setToastShown] = useState(false);
  const [logoutShown, setLogoutShown] = useState(false);

  // useEffect(() => {
  //   if (isRegistered) {
  //     toast.success("Registration successful!");
  //   }
  // }, [isRegistered]);

  useEffect(() => {
    if (isLoggedIn && !toastShown) {
      toast.success("Login successful!");
      setToastShown(true);
      setLogoutShown(false);
    }
  }, [isLoggedIn, toastShown]);

  useEffect(() => {
    if (isLoggedOut && !logoutShown) {
      toast.success("You are not Logged in!");
      setLogoutShown(true);
      setToastShown(false);
    }
  }, [isLoggedOut, logoutShown]);

  useEffect(() => {
    if (errorAuth) {
      toast.error(errorAuth);
    }
  }, [errorAuth]);

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

  return (
    <div className={styles.cont}>
      <Header handleClick={handleClick} />

      <ToastContainer position="top-center" autoClose={1500} />

      <main className={clsx(styles.main, user?.theme === "dark" ? styles.mainDark : user?.theme === "violet" ? styles.mainViolet : user?.theme === "light" ? styles.mainLight : styles.mainLight)}>
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
