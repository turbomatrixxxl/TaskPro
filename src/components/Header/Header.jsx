import React from "react";
import PropTypes from "prop-types";

import { useMediaQuery } from "react-responsive";

import { useAuth } from "../../hooks/useAuth";

import clsx from "clsx";

// import UserLogout from "../UserLogout/UserLogout";


import styles from "./Header.module.css";

const breakpoints = {
  mobile: "(max-width: 767px)",
  tablet: "(min-width:768px)",
  desktop: "(min-width:1024px)",
};

function Header({ handleClick }) {
  const { user } = useAuth();

  const imageUrl = `https://taskpro-nodejs.onrender.com/${user.avatarURL}`;

  const isMobile = useMediaQuery({ query: breakpoints.mobile });
  const isTablet = useMediaQuery({ query: breakpoints.tablet });
  // const isDesktop = useMediaQuery({ query: breakpoints.desktop });



  return (
    <>
      <header
        className={clsx(styles.header, user?.theme === "dark" ? styles.headerDark : user?.theme === "violet" ? styles.headerViolet : user?.theme === "light" ? styles.headerLight : styles.headerLight)}
      >
        {isMobile && <button onClick={handleClick} className={styles.hamButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 12H21" stroke={clsx(user?.theme === "dark" ? "white" : "#161616")} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3 6H21" stroke={clsx(user?.theme === "dark" ? "white" : "#161616")} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3 18H21" stroke={clsx(user?.theme === "dark" ? "white" : "#161616")} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>}

        {isTablet && <button onClick={handleClick} className={styles.hamButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M4 16H28" stroke={clsx(user?.theme === "dark" ? "white" : "#161616")} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4 8H28" stroke={clsx(user?.theme === "dark" ? "white" : "#161616")} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4 24H28" stroke={clsx(user?.theme === "dark" ? "white" : "#161616")} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>}

        <div className={clsx(styles.userContainer, user?.theme === "dark" ? styles.userContainerDark : styles.userContainer)}>
          <p>{user ? user?.username : "User"}</p>

          <img src={imageUrl} alt="User Avatar" style={{ width: '32px', height: '32px', borderRadius: '8px' }} />
        </div>
      </header>
    </>
  );
}

Header.propTypes = {
  handleClick: PropTypes.func,
};


export default Header;
