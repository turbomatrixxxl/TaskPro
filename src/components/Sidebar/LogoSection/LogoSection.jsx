import React from 'react';
import { useAuth } from '../../../hooks/useAuth'; 
import icons from '../../../images/sprite.svg'; 
import clsx from 'clsx';
import styles from './LogoSection.module.css'; 

const LogoSection = () => {
  const { user } = useAuth();

  return (
    <div className={clsx(styles.logo, user?.theme)}>
      <svg className={styles.iconLogo}>
        <use href={`${icons}#logo`} />
      </svg>
      <span>Task Pro</span>
    </div>
  );
};

export default LogoSection;
