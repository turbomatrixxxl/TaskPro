import React, { useState } from 'react';
import styles from './MyBoardsSection.module.css'; 

const MyBoardsSection = ({ setShowModalBoard }) => {
  // const [showModalBoard, setShowModalBoard] = useState(false); 

  return (
    <div>
      <h3 className={styles.h3Board}>My boards</h3>

     
      <div className={styles.createBoard}>
        <div>
          Create a<br /> new board
        </div>
        
        <button 
          className={styles.iconPlus}
          onClick={() => {
            // Deschide modalul de creare a unui board
            // setShowModalBoard(true);
            
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4.16663V15.8333" stroke="#121212" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.1665 10H15.8332" stroke="#121212" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

    </div>
  );
};

export default MyBoardsSection;