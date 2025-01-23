import React from 'react';
import { useAuth } from '../../hooks/useAuth';

import styles from './MyBoardsSection.module.css';
import clsx from 'clsx';

const MyBoardsSection = ({ setShowModalBoard }) => {
  const { user } = useAuth()

  // const [showModalBoard, setShowModalBoard] = useState(false); 

  return (
    <div className={styles.cont}>
      <h3 className={clsx(styles.h3Board, user?.theme === "light" ? styles.lightH3 : styles.h3Board)}>My boards</h3>


      <div className={clsx(styles.createBoardCont, user?.theme === "light" ? styles.createBoardContLight : styles.createBoardCont)}>
        <div className={clsx(styles.createBoardText, user?.theme === "light" ? styles.createBoardTextLight : styles.createBoardText)}>
          Create a<br /> new board
        </div>

        <button
          className={clsx(styles.iconPlus, user?.theme === "violet" ? styles.iconPlusViolet : styles.iconPlus)}
          onClick={() => {
            // Deschide modalul de creare a unui board
            // setShowModalBoard(true);

          }}
        >
          {user?.theme === "violet" ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4.16663V15.8333" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.16699 10H15.8337" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg> :
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4.16663V15.8333" stroke="#121212" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4.1665 10H15.8332" stroke="#121212" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>}
        </button>
      </div>

    </div>
  );
};

export default MyBoardsSection;