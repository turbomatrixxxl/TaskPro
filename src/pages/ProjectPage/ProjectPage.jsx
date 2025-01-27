import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { usePrivate } from "../../hooks/usePrivate";

import Filters from "../../components/Filters";
import { getBackground } from "../../utils/backgrounds";

import clsx from "clsx";

import AddColumnPlus from "../../components/AddColumnPlus";
import AddColumn from "../../components/modal/Addcolumn/AddColumn";
import EditColumn from "../../components/modal/EditColumn/EditColumn";
import DeleteColumn from "../../components/modal/DeleteColumn/DeleteColumn";
import AddCardSara from "../../components/modal/AddCardSara/AddCardSara";

import Button from "../../components/commonComponents/Button";
import ReusablePlus from "../../components/commonComponents/ReusablePlus/ReusablePlus";

import iconsSvg from "../../images/sprite.svg";

import styles from "./ProjectPage.module.css";

export default function ProjectPage() {
  const navigate = useNavigate();
  const { projectName } = useParams();
  const { user } = useAuth();
  console.log(user);

  const { privateFilter } = usePrivate();

  const [isOpenAddColumnModal, setIsOpenAddColumnModal] = useState(false);
  const [isOpenEditColumnModal, setIsOpenEditColumnModal] = useState(false);
  const [isOpenDeleteColumnModal, setIsOpenDeletColumnModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);

  const [isOpenAddCardModal, setIsOpenAddCardModal] = useState(false);

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
    if (!project?.background) return null;

    const backgroundId = parseInt(project.background, 10);
    const background = getBackground(backgroundId);

    if (!background) return null;

    let backgroundUrl = "";
    if (isMobile) {
      backgroundUrl = background.mobile;
    } else if (isTablet || isDesktop) {
      backgroundUrl = background.desktop;
    }

    return `url(${backgroundUrl})`;
  };

  const sectionStyle = {
    backgroundImage: getAdaptiveBackground(),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    transition: "background 0.3s ease",
  };

  const handleOpenAddColumnModal = () => {
    setIsOpenAddColumnModal(true);
  };

  const handleCloseAddColumnModal = () => {
    setIsOpenAddColumnModal(false);
  };

  const handleOpenEditColumnModal = (columnName) => {
    setSelectedColumn(columnName);
    setIsOpenEditColumnModal(true);
  };

  const handleCloseEditColumnModal = () => {
    setSelectedColumn(null);
    setIsOpenEditColumnModal(false);
  };

  const handleOpenDeleteColumnModal = (columnName) => {
    setSelectedColumn(columnName);
    setIsOpenDeletColumnModal(true);
  };

  const handleCloseDeleteColumnModal = () => {
    setSelectedColumn(null);
    setIsOpenDeletColumnModal(false);
  };

  const handleOpenAddCardModal = (columnName) => {
    setSelectedColumn(columnName);

    setIsOpenAddCardModal(true);
  };

  const handleCloseAddCardModal = () => {
    setIsOpenAddCardModal(false);
  };

  return (
    <div className={styles.mainCont}>
      {isOpenAddColumnModal && (
        <AddColumn
          onClose={handleCloseAddColumnModal}
          projectName={projectName}
        />
      )}
      {isOpenEditColumnModal && selectedColumn && (
        <EditColumn
          projectName={projectName}
          columnName={selectedColumn}
          onClose={handleCloseEditColumnModal}
        />
      )}
      {isOpenDeleteColumnModal && selectedColumn && (
        <DeleteColumn
          projectName={projectName}
          columnName={selectedColumn}
          onClose={handleCloseDeleteColumnModal}
        />
      )}

      <div style={sectionStyle} className={styles.cont}>
        <div className={styles.upperCont}>
          <h1
            className={clsx(
              styles.projectName,
              user?.theme === "dark" ? styles.projectNameDark : null,
              project?.background !== "none"
                ? user.theme === "dark"
                  ? styles.backgroundDark
                  : styles.backgroundLight
                : null
            )}>
            {project?.name || "project"}
          </h1>
          <Filters background={project?.background} />
        </div>
        <div className={styles.downCont}>
          <div className={styles.columnsCont}>
            {project?.columns.map((column, colIndex) => {
              if (column.length === 0) return null;
              return (
                <div key={`column-${colIndex}`} className={styles.columnCont}>
                  {isOpenAddCardModal && selectedColumn && (
                    <AddCardSara
                      onClose={handleCloseAddCardModal}
                      projectName={projectName}
                      columnName={column.name}
                    />
                  )}
                  <div
                    className={clsx(
                      styles.columnEditCont,
                      user?.theme === "dark" ? styles.columnEditContDark : null
                    )}>
                    <span>{column.name}</span>
                    <div className={styles.columnIconCont}>
                      <svg
                        onClick={() => handleOpenEditColumnModal(column.name)}
                        className={clsx(
                          styles.columnIcon,
                          user.theme === "dark" ? styles.columnIconLight : null
                        )}>
                        <use href={`${iconsSvg}#pencil`} />
                      </svg>
                      <svg
                        onClick={() => handleOpenDeleteColumnModal(column.name)}
                        className={clsx(
                          styles.columnIcon,
                          user.theme === "dark" ? styles.columnIconLight : null
                        )}>
                        <use href={`${iconsSvg}#trash`} />
                      </svg>
                    </div>
                  </div>
                  <div className={styles.tasksCont}>
                    {column.cards
                      .filter((task) => {
                        console.log(task);

                        if (privateFilter === "Show all") return true;
                        return task.priority === privateFilter;
                      })
                      .map((task, taskIndex) => (
                        <div
                          key={`task-${taskIndex}`}
                          className={styles.taskItem}>
                          <span>{task.title || `Task ${taskIndex + 1}`}</span>
                        </div>
                      ))}
                  </div>
                  <Button
                    handleClick={handleOpenAddCardModal}
                    className={styles.btn}
                    type="submit"
                    theme={user?.theme}
                    variant="send">
                    <ReusablePlus />
                    <span>Add another card</span>
                  </Button>
                </div>
              );
            })}
          </div>
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
