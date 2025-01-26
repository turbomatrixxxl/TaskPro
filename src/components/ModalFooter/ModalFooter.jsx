import React, { useEffect, useRef } from "react";
import styles from "./ModalFooter.module.css";
import { useMediaQuery } from "react-responsive";
import ModalLogo from "../commonComponents/FooterLogo/FooterLogo";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import FormButton from "../commonComponents/FormButton/FormButton";
import "animate.css";

// Corectarea importului imaginii
import Radu from "../../images/teamMembersPhoto/Radu.webp";
import Adrian from "../../images/teamMembersPhoto/Adrian.jpg";
import Sara from "../../images/teamMembersPhoto/Sara.png";
import catalin from "../../images/teamMembersPhoto/catalin.webp";

const ModalFooter = ({ closeModal }) => {
  const modalRef = useRef();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const addCloseEvent = (event) => {
      if (event.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", addCloseEvent);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", addCloseEvent);
    };
  });

  const closeOnClickOutside = (event) => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  const screenCondition = useMediaQuery({ query: "(min-width: 768px)" });

  const animation = "animate__animated animate__fadeInDown animate__slow";

  return (
    <div
      className={styles.modalFooter}
      onClick={closeOnClickOutside}
      ref={modalRef}>
      <div className={styles.modalBg}>
        <div className={styles.modalContent}>
          {screenCondition && <ModalLogo variant={"formLogo"} />}
          <h2>Ultimate Team:</h2>

          <div className={styles.footerCards}>
            {/* Card pentru Radu */}
            <div
              className={`${styles.footerTeamCard} ${animation} ${styles.Radu}`}>
              <img
                src={Radu} // Folosește variabila corectă pentru imagine
                alt="Radu"
                className={styles.teamMemberImage}
              />
              <span className={styles.footerTeamName}>
                Naramzoiu Radu Bogdan
              </span>
              <em className={styles.footerTeamFunction}>Team Leader</em>
              <div className={styles.socialLinks}>
                <a
                  href="https://github.com/turbomatrixxxl"
                  className={styles.footerGithubIcon}
                  aria-label="GitHub profile"
                  target="_blank"
                  rel="noreferrer noopener">
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/radu-bogdan-naramzoiu-fullstack-developer/"
                  className={styles.footerLinkedinIcon}
                  aria-label="LinkedIn profile"
                  target="_blank"
                  rel="noreferrer noopener">
                  <FaLinkedin />
                </a>
              </div>
            </div>

            {/* Card pentru Adrian */}
            <div
              className={`${styles.footerTeamCard} ${animation} ${styles.Adrian}`}>
              <img
                src={Adrian} // Folosește variabila corectă pentru imagine
                alt="Secara Adrian"
                className={styles.teamMemberImage}
              />
              <span className={styles.footerTeamName}>Secara Adrian</span>
              <em className={styles.footerTeamFunction}>Scrum Master</em>
              <div className={styles.socialLinks}>
                <a
                  href="https://github.com/SecaraAdrian"
                  className={styles.footerGithubIcon}
                  aria-label="GitHub profile"
                  target="_blank"
                  rel="noreferrer noopener">
                  <FaGithub />
                </a>
                <a
                  href="http://linkedin.com/in/adrian-secara-254ba3312"
                  className={styles.footerLinkedinIcon}
                  aria-label="LinkedIn profile"
                  target="_blank"
                  rel="noreferrer noopener">
                  <FaLinkedin />
                </a>
              </div>
            </div>

            {/* Card pentru Sara */}
            <div
              className={`${styles.footerTeamCard} ${animation} ${styles.Sara}`}>
              <img
                src={Sara} // Folosește variabila corectă pentru imagine
                alt="Smarandoiu Sara"
                className={styles.teamMemberImage}
              />
              <span className={styles.footerTeamName}>Smarandoiu Sara</span>
              <em className={styles.footerTeamFunction}>Frontend Developer</em>
              <div className={styles.socialLinks}>
                <a
                  href="https://github.com/turbomatrixxxl"
                  className={styles.footerGithubIcon}
                  aria-label="GitHub profile"
                  target="_blank"
                  rel="noreferrer noopener">
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/radu-bogdan-naramzoiu-fullstack-developer/"
                  className={styles.footerLinkedinIcon}
                  aria-label="LinkedIn profile"
                  target="_blank"
                  rel="noreferrer noopener">
                  <FaLinkedin />
                </a>
              </div>
            </div>

            {/* Adaugă alte carduri pentru membrii echipei dacă este necesar */}
          </div>

          <FormButton
            type={"button"}
            text={"Thank You"}
            variant={"whiteButtton"}
            handlerFunction={() => closeModal()}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalFooter;
