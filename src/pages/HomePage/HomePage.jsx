import React, { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import SharedLayout from '../../components/SharedLayout/SharedLayout';
import Sidebar from '../../components/Sidebar';
import useToggle from "../../hooks/useToggle";
import styles from "./HomePage.module.css";
import { useAuth } from "../../hooks/useAuth";
import clsx from "clsx";

const breakpoints = {
  mobile: "(max-width: 767px)",
  tablet: "(min-width:768px)",
  desktop: "(min-width:1024px)",
};

export default function HomePage() {
  const [isSidebarVisible, toggleIsSidebarVisible] = useToggle(false); // Default to false for mobile
  const sideBarRef = useRef();
  const isDesktop = useMediaQuery({ query: breakpoints.desktop });
  const { user } = useAuth()

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isSidebarVisible) toggleIsSidebarVisible();
    };

    const handleClickOutside = (event) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target) && isSidebarVisible) {
        toggleIsSidebarVisible();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarVisible, toggleIsSidebarVisible]);

  return (
    <section className={styles.section}>
      {!isDesktop && (
        <div
          className={clsx(
            styles.sidebarWrapper,
            isSidebarVisible ? styles.sidebarOpen : styles.sidebarClose,
            user?.theme === "dark" && styles.bgDark
          )}
        >
          <Sidebar sideBarRef={sideBarRef} />
        </div>
      )}
      {isDesktop && <Sidebar />}
      <SharedLayout handleClick={toggleIsSidebarVisible} />
    </section>
  );

}
