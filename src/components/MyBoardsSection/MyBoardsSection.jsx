import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import clsx from "clsx";
// import { useDispatch } from 'react-redux';

import NewBoardForm from "../modal/NewBoard";

import styles from "./MyBoardsSection.module.css";

const MyBoardsSection = () => {
  const { user } = useAuth();
  const [showModalBoard, setShowModalBoard] = useState(false);

  const handleclose = () => {
    setShowModalBoard(false);
  };

  return (
    <>
      {showModalBoard && <NewBoardForm onClose={handleclose} />}
      <div className={styles.cont}>
        <h3
          className={clsx(
            styles.h3Board,
            user?.theme === "light" ? styles.lightH3 : styles.h3Board
          )}>
          My boards
        </h3>
        <div
          className={clsx(
            styles.createBoardCont,
            user?.theme === "light"
              ? styles.createBoardContLight
              : styles.createBoardCont
          )}>
          <div
            className={clsx(
              styles.createBoardText,
              user?.theme === "light"
                ? styles.createBoardTextLight
                : styles.createBoardText
            )}>
            Create a<br /> new board
          </div>
          <button
            className={clsx(
              styles.iconPlus,
              user?.theme === "violet" ? styles.iconPlusViolet : styles.iconPlus
            )}
            onClick={() => {
              setShowModalBoard(true);
            }}>
            {user?.theme === "violet" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none">
                <path
                  d="M10 4.16663V15.8333"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.16699 10H15.8337"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none">
                <path
                  d="M10 4.16663V15.8333"
                  stroke="#121212"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.1665 10H15.8332"
                  stroke="#121212"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default MyBoardsSection;
