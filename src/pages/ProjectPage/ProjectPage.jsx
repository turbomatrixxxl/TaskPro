import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// import { usePrivate } from "../../hooks/usePrivate";

import Filters from "../../components/Filters";

import { getBackground } from "../../utils/backgrounds";

import clsx from "clsx";
import AddColumnPlus from "../../components/AddColumnPlus";

import styles from "./ProjectPage.module.css";
import AddColumn from "../../components/modal/Addcolumn/AddColumn";

export default function ProjectPage() {
  const navigate = useNavigate();

  const { projectName } = useParams();
  // console.log(projectName);

  const { user } = useAuth();
  // console.log(user);
  // const { privateFilter } = usePrivate();
  // console.log(privateFilter);

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  // Media Queries for Responsive Backgrounds
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isDesktop = !isMobile && !isTablet;

  const project = user?.projects?.find(
    (project) => project?.name === projectName
  );

  useEffect(() => {
    if (
      project === -1 ||
      !project ||
      project === null ||
      undefined ||
      null ||
      projectName === undefined ||
      null
    ) {
      navigate("/home");
    }
  }, [navigate, project, projectName]);

  // Function to get the adaptive background based on the backgroundId
  const getAdaptiveBackground = () => {
    if (!project?.background) {
      console.log("bg null");

      // No backgroundId, return null
      return null;
    }

    // Convert backgroundId to an integer
    const backgroundId = parseInt(project.background, 10);
    const background = getBackground(backgroundId); // Fetch the background object

    if (!background) return null; // If no background found, return null

    let backgroundUrl = "";
    if (isMobile) {
      backgroundUrl = background.mobile;
    } else if (isTablet) {
      backgroundUrl = background.desktop;
    } else if (isDesktop) {
      backgroundUrl = background.desktop;
    }

    return `url(${backgroundUrl})`;
  };

  const sectionStyle = {
    backgroundImage: getAdaptiveBackground(),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    transition: "background 0.3s ease", // Smooth transition when changing backgrounds
  };

  const handleOpenAddColumnModal = () => {
    setIsOpenAddModal(true);
  };

  const handleCloseAddColumnModal = () => {
    setIsOpenAddModal(false);
  };

  return (
    <div className={styles.mainCont}>
      {isOpenAddModal && (
        <AddColumn
          onClose={handleCloseAddColumnModal}
          projectName={projectName}
        />
      )}
      <div
        style={sectionStyle} // Apply dynamic background
        className={styles.cont}>
        <div className={styles.upperCont}>
          <h1
            className={clsx(
              styles.projectName,
              user.theme === "dark" ? styles.projectNameDark : null,
              project?.background !== "none"
                ? user.theme === "dark"
                  ? styles.backgroundDark
                  : styles.backgroundLight
                : null
            )}>
            {project?.name || "project"}
          </h1>
          <Filters background={project.background} />
        </div>
        <div className={styles.downCont}>
          {project?.columns.map((column, index) => {
            if (column.length === 0) {
              return null;
            }
            return (
              <div key={column.name || index} className={styles.columnsCont}>
                <div className={styles.columnCont}>{column.name}</div>
              </div>
            );
          })}
          <button
            onClick={handleOpenAddColumnModal}
            className={clsx(
              styles.addColumnBtn,
              user.theme === "dark" ? styles.addColumnBtnDark : null
            )}>
            <AddColumnPlus />
            <span>Add another column</span>
          </button>
        </div>
      </div>
    </div>
  );
}
