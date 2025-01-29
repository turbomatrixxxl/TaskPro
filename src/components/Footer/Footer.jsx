import { useState } from "react";
import Modal from "../ModalFooter/ModalFooter";
import { useAuth } from "../../hooks/useAuth";

import styles from "./Footer.module.css";
import clsx from "clsx";

const Footer = () => {
  const [modalOpen, setModalOpen] = useState(false); // Starea pentru a ține evidența dacă modalul este deschis sau nu
  const { user } = useAuth();

  const handleTextClick = () => {
    setModalOpen(true); // Deschide modalul la click
  };

  return (
    <footer
      className={clsx(
        styles.footer,
        user?.theme === "dark"
          ? styles.dark
          : user?.theme === "violet"
          ? styles.violet
          : null
      )}>
      <div
        onClick={handleTextClick}
        className={clsx(
          styles.footerText,
          user?.theme === "light"
            ? styles.lightText
            : user?.theme === "violet"
            ? styles.violetText
            : null
        )}>
        <p>℗ & © GoIT 2024</p>
        <p>Powered by Ultimate Team</p>
      </div>
      {/* Randează Modal-ul dacă este deschis */}
      {modalOpen && <Modal closeModal={() => setModalOpen(false)} />}
    </footer>
  );
};

export default Footer;
