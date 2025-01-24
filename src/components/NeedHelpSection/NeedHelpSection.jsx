import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import plant from '../../images/cactus.png';
import clsx from 'clsx';

import styles from './NeedHelpSection.module.css';
// import NeedHelp from '../../modal/NeedHelp/NeedHelp'; 

const NeedHelpSection = () => {
  const { user } = useAuth();
  // const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    // setShowModal(true); 
  };

  // const handleCloseModal = () => {
  //   setShowModal(false); 
  // };

  return (
    <div className={clsx(styles.helpContainer, user?.theme === "dark" ? styles.helpContainerDark : user?.theme === "violet" ? styles.helpContainerViolet : styles.helpContainer)}>
      <div className={styles.plantContainer}>
        <img src={plant} alt="Plant" className={styles.plantImage} />
      </div>
      <div className={clsx(styles.helpText, user?.theme !== "light" ? styles.white : styles.helpText)}>
        <p>
          If you need help with <span className={clsx(styles.highlight, user?.theme === "violet" ? styles.violet : styles.highlight)}>TaskPro</span>, check out our support resources or reach out to our customer support team.
        </p>
      </div>
      <div className={clsx(styles.helpBar, user?.theme !== "light" ? styles.white : styles.helpBar)} onClick={handleOpenModal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <g clip-path="url(#clip0_276_1776)">
            <path d="M10.0001 18.3334C14.6025 18.3334 18.3334 14.6024 18.3334 10C18.3334 5.39765 14.6025 1.66669 10.0001 1.66669C5.39771 1.66669 1.66675 5.39765 1.66675 10C1.66675 14.6024 5.39771 18.3334 10.0001 18.3334Z" stroke={user?.theme !== "light" ? "white" : "#161616"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.57495 7.49999C7.77087 6.94304 8.15758 6.47341 8.66658 6.17426C9.17558 5.87512 9.77403 5.76577 10.3559 5.86558C10.9378 5.96539 11.4656 6.26792 11.8458 6.71959C12.2261 7.17126 12.4342 7.74292 12.4333 8.33332C12.4333 9.99999 9.93328 10.8333 9.93328 10.8333" stroke={user?.theme !== "light" ? "white" : "#161616"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 14.1667H10.0125" stroke={user?.theme !== "light" ? "white" : "#161616"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_276_1776">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span>Need help?</span>
      </div>

      {/* 
      {showModal && <NeedHelp onClose={handleCloseModal} />} 
      */}
    </div>
  );
};

export default NeedHelpSection;