import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";

import { moveTask } from "../../redux/private/operationsPrivate";
import { refreshUser } from "../../redux/auth/operationsAuth";

import { useAuth } from "../../hooks/useAuth";
import { usePrivate } from "../../hooks/usePrivate";

import Filters from "../../components/Filters";
import { getBackground } from "../../utils/backgrounds";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import clsx from "clsx";

import AddColumnPlus from "../../components/AddColumnPlus";
import AddColumn from "../../components/modal/Addcolumn/AddColumn";
import EditColumn from "../../components/modal/EditColumn/EditColumn";
import DeleteColumn from "../../components/modal/DeleteColumn/DeleteColumn";

import AddCardSara from "../../components/modal/AddCardSara/AddCardSara";

import EditCard from "../../components/modal/EditCard/EditCard";
import MoveCard from "../../components/modal/MoveCard/MoveCard";
import DeleteCard from "../../components/modal/DeleteCard/DeleteCard";

import Button from "../../components/commonComponents/Button";
import ReusablePlus from "../../components/commonComponents/ReusablePlus/ReusablePlus";

import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Include toast styles

import iconsSvg from "../../images/sprite.svg";

import styles from "./ProjectPage.module.css";

export default function ProjectPage() {
  const navigate = useNavigate();
  const { projectName } = useParams();
  const { user } = useAuth();
  // console.log(user);

  const dispatch = useDispatch();

  const { privateFilter } = usePrivate();

  const [isOpenAddColumnModal, setIsOpenAddColumnModal] = useState(false);
  const [isOpenEditColumnModal, setIsOpenEditColumnModal] = useState(false);
  const [isOpenDeleteColumnModal, setIsOpenDeletColumnModal] = useState(false);
  const [isOpenAddCardModal, setIsOpenAddCardModal] = useState(false);
  const [isOpenEditTaskModal, setIsOpenEditTaskModal] = useState(false);
  const [isOpenDeleteTaskModal, setIsOpenDeleteTaskModal] = useState(false);

  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedTaskName, setSelectedTaskName] = useState(null);
  const [selectedTaskNameDescription, setSelectedTaskDescription] =
    useState(null);
  const [selectedTaskNamePriority, setSelectedTaskPriority] = useState(null);
  const [selectedTaskNameDueDate, setSelectedTaskDueDate] = useState(null);

  // Media Queries for Responsive Backgrounds
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isDesktop = !isMobile && !isTablet;

  const project = user?.projects?.find(
    (project) =>
      project?.name.trim().toLowerCase() === projectName.trim().toLowerCase()
  );

  // console.log(user?.projects);

  // console.log("projectName :", projectName);

  // console.log("project :", project);

  useEffect(() => {
    if (projectName === undefined) {
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

  const getPriorityColor = (priority) => {
    if (priority === "Low") {
      return "#8FA1D0";
    }

    if (priority === "Medium") {
      return "#E09CB5";
    }

    if (priority === "High") {
      return "#BEDBB0";
    }

    if (priority === "Without priority") {
      return "#808080";
    }
  };

  function TaskAlert(task) {
    const today = new Date();
    const dueDate = new Date(task.dueDate); // Ensure task.dueDate is in a valid Date format
    const diffInTime = dueDate - today;
    // console.log(diffInTime);

    const remainingDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    const getIconClass = () => {
      if (remainingDays <= 3 && remainingDays > 0)
        return clsx(styles.iconAlert, styles.medium);
      if (remainingDays <= 0) return clsx(styles.iconAlert, styles.high);
      return clsx(styles.iconAlert);
    };

    // console.log(getIconClass());

    const handleClick = () => {
      if (remainingDays <= 5 && remainingDays > 0) {
        toast.warning(
          `Warning, there are ${remainingDays} days left to finish this task...!`
        );
      }
      // console.log(remainingDays);
      // console.log(diffInTime);

      if (remainingDays === 0) {
        toast.warning(
          `Warning, there are ${remainingDays} days left to finish this task...! You must finish the task Today...!!!`
        );
      }

      if (remainingDays < 0) {
        toast.warning(
          `Warning, there are ${-Number(
            remainingDays
          )} days overdue to finish this task...!`
        );
      }
    };

    return (
      <svg
        width="16"
        height="16"
        onClick={handleClick}
        // style={iconStyle}
        className={clsx(
          remainingDays <= 5 && styles.taskBell,
          remainingDays <= 2 && styles.highPriorityBell,
          getIconClass()
        )}>
        <use
          href={`${iconsSvg}#${clsx(
            user?.theme === "violet" ? "bell-violet" : "bell-green"
          )}`}
        />
      </svg>
    );
  }

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
    setSelectedColumn(null);

    setIsOpenAddCardModal(false);
  };

  const handleOpenEditTaskModal = (
    columnName,
    title,
    description,
    priority,
    dueDate
  ) => {
    setSelectedColumn(columnName);

    setSelectedTaskName(title);
    setSelectedTaskDescription(description);
    setSelectedTaskPriority(priority);
    setSelectedTaskDueDate(dueDate);

    setIsOpenEditTaskModal(true);
  };

  const handleCloseEditTaskModal = () => {
    setSelectedColumn(null);

    setSelectedTaskName(null);
    setSelectedTaskDescription(null);
    setSelectedTaskPriority(null);
    setSelectedTaskDueDate(null);

    setIsOpenEditTaskModal(false);
  };

  const handleOpenDeleteTaskModal = (columnName, task) => {
    setSelectedColumn(columnName);
    setSelectedTaskName(task);

    setIsOpenDeleteTaskModal(true);
  };

  const handleCloseDeleteTaskModal = () => {
    setSelectedColumn(null);
    setSelectedTaskName(null);

    setIsOpenDeleteTaskModal(false);
  };

  const updateTaskColumn = (projectName, taskName, columnName, toColumn) => {
    dispatch(
      moveTask({
        projectName,
        columnName,
        taskName,
        toColumnName: toColumn,
      })
    );
  };

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // console.log("project", project);

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // Ensure data is ready
    if (!project || !project.columns || !Array.isArray(project.columns)) return;

    const fromColumnId = source.droppableId;

    const toColumnId = destination.droppableId;

    const taskId = draggableId;

    const fromColumn = project.columns.find((col) => col.name === fromColumnId);
    // console.log("fromColumn", fromColumn);

    const toColumn = project.columns.find((col) => col.name === toColumnId);
    // console.log("toColumn", toColumn);

    if (!fromColumn || !toColumn) return;

    // console.log("draggableId (taskId):", taskId);
    const task = fromColumn.cards.find((t) => t._id === taskId);
    // console.log("task", task);
    // console.log(
    //   "fromColumn.cards ids:",
    //   fromColumn.cards.map((t) => t.id || t._id)
    // );

    if (!task) return;

    // console.log(project?.name);
    // console.log(task?.title);
    // console.log(fromColumn?.name);
    // console.log(toColumn?.name);

    updateTaskColumn(
      project?.name,
      task?.title,
      fromColumn?.name,
      toColumn?.name
    );

    setTimeout(() => {
      dispatch(refreshUser());
    }, 500);
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
      {isOpenAddCardModal && selectedColumn && (
        <AddCardSara
          onClose={handleCloseAddCardModal}
          projectName={projectName}
          columnName={selectedColumn}
        />
      )}
      {isOpenEditTaskModal && (
        <EditCard
          onClose={handleCloseEditTaskModal}
          projectName={projectName}
          columnName={selectedColumn}
          taskName={selectedTaskName}
          taskDescription={selectedTaskNameDescription}
          taskPriority={selectedTaskNamePriority}
          taskDueDate={selectedTaskNameDueDate}
        />
      )}
      {isOpenDeleteTaskModal && selectedTaskName && (
        <DeleteCard
          projectName={projectName}
          columnName={selectedColumn}
          taskName={selectedTaskName}
          onClose={handleCloseDeleteTaskModal}
        />
      )}

      <div style={sectionStyle} className={styles.cont}>
        <div className={styles.upperCont}>
          <h1
            className={clsx(
              styles.projectName,
              user?.theme === "dark" ? styles.projectNameDark : null,
              project?.background !== "none"
                ? user?.theme === "dark"
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
            <DragDropContext onDragEnd={handleDragEnd}>
              {project?.columns?.map((column, colIndex) => {
                if (column.length === 0) return null;
                return (
                  <Droppable
                    droppableId={column?.name}
                    key={`column-${colIndex}`}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={styles.columnCont}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "#e0e0e0"
                            : "inherit",
                          transition: "background-color 0.2s ease",
                        }}>
                        <div
                          className={clsx(
                            styles.columnEditCont,
                            user?.theme === "dark"
                              ? styles.columnEditContDark
                              : null
                          )}>
                          <span>{column.name}</span>
                          <div className={styles.columnIconCont}>
                            <svg
                              onClick={() =>
                                handleOpenEditColumnModal(column.name)
                              }
                              className={clsx(
                                styles.columnIcon,
                                user.theme === "dark"
                                  ? styles.columnIconLight
                                  : null
                              )}>
                              <use href={`${iconsSvg}#pencil`} />
                            </svg>
                            <svg
                              onClick={() =>
                                handleOpenDeleteColumnModal(column.name)
                              }
                              className={clsx(
                                styles.columnIcon,
                                user.theme === "dark"
                                  ? styles.columnIconLight
                                  : null
                              )}>
                              <use href={`${iconsSvg}#trash`} />
                            </svg>
                          </div>
                        </div>
                        <div className={styles.tasksCont}>
                          {column.cards
                            .filter((task) => {
                              if (privateFilter === "Show all") return true;
                              return task.priority === privateFilter;
                            })
                            .map((task, taskIndex) => (
                              <Draggable
                                key={task._id || `task-${taskIndex}`}
                                draggableId={task._id || `task-${taskIndex}`}
                                index={taskIndex}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={clsx(
                                      styles.taskItemCont,
                                      user.theme === "dark"
                                        ? styles.taskItemContDark
                                        : null,
                                      snapshot.isDragging && styles.draggingTask
                                    )}>
                                    <div
                                      style={{
                                        background: `${getPriorityColor(
                                          task.priority
                                        )}`,
                                      }}
                                      className={styles.priorityColor}></div>
                                    <div className={styles.taskItem}>
                                      <h3
                                        className={clsx(
                                          styles.taskTitle,
                                          user.theme === "dark"
                                            ? styles.taskTitleDark
                                            : null
                                        )}>
                                        {task.title || `Task ${taskIndex + 1}`}
                                      </h3>
                                      <div
                                        className={clsx(
                                          styles.taskDesc,
                                          user.theme === "dark"
                                            ? styles.taskDescDark
                                            : null
                                        )}>
                                        {task?.description}
                                      </div>
                                      <div
                                        className={clsx(
                                          styles.taskLine,
                                          user.theme === "dark"
                                            ? styles.taskLineDark
                                            : null
                                        )}></div>
                                      <div className={styles.taskDownCont}>
                                        <div
                                          className={styles.taskDownLeftCont}>
                                          <div
                                            className={
                                              styles.taskDownLeftLCont
                                            }>
                                            <p
                                              className={clsx(
                                                styles.taskPriorityTitle,
                                                user.theme === "dark"
                                                  ? styles.taskPriorityTitleDark
                                                  : null
                                              )}>
                                              Priority
                                            </p>
                                            <div
                                              className={
                                                styles.taskPriorityItems
                                              }>
                                              <span
                                                style={{
                                                  background: `${getPriorityColor(
                                                    task.priority
                                                  )}`,
                                                }}
                                                className={
                                                  styles.taskPriorityColor
                                                }></span>
                                              <p
                                                className={clsx(
                                                  styles.taskPriorityDesc,
                                                  user.theme === "dark"
                                                    ? styles.taskPriorityDescDark
                                                    : null
                                                )}>
                                                {task?.priority ===
                                                "Without priority"
                                                  ? "Without"
                                                  : task.priority}
                                              </p>
                                            </div>
                                          </div>
                                          <div
                                            className={
                                              styles.taskDownLeftRCont
                                            }>
                                            <p
                                              className={clsx(
                                                styles.taskDeadlineTitle,
                                                user.theme === "dark"
                                                  ? styles.taskDeadlineTitleDark
                                                  : null
                                              )}>
                                              Deadline
                                            </p>
                                            <div
                                              className={clsx(
                                                styles.taskDeadlineDate,
                                                user.theme === "dark"
                                                  ? styles.taskDeadlineDateDark
                                                  : null
                                              )}>
                                              {
                                                new Date(task?.dueDate)
                                                  .toISOString()
                                                  .split("T")[0]
                                              }
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className={styles.taskDownRightCont}>
                                          {TaskAlert(task)}
                                          <div
                                            className={styles.columnIconCont}>
                                            <MoveCard
                                              projectName={projectName}
                                              columnName={column?.name}
                                              taskName={task?.title}
                                            />
                                            <svg
                                              onClick={() => {
                                                handleOpenEditTaskModal(
                                                  column?.name,
                                                  task?.title,
                                                  task?.description,
                                                  task?.priority,
                                                  task?.dueDate
                                                );
                                              }}
                                              className={clsx(
                                                styles.columnIcon,
                                                user.theme === "dark"
                                                  ? styles.columnIconLight
                                                  : null
                                              )}>
                                              <use
                                                href={`${iconsSvg}#pencil`}
                                              />
                                            </svg>
                                            <svg
                                              onClick={() =>
                                                handleOpenDeleteTaskModal(
                                                  column.name,
                                                  task.title
                                                )
                                              }
                                              className={clsx(
                                                styles.columnIcon,
                                                user.theme === "dark"
                                                  ? styles.columnIconLight
                                                  : null
                                              )}>
                                              <use href={`${iconsSvg}#trash`} />
                                            </svg>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </div>
                        <Button
                          handleClick={() => {
                            handleOpenAddCardModal(column.name);
                          }}
                          className={styles.btn}
                          type="submit"
                          theme={user?.theme}
                          variant="send">
                          <ReusablePlus />
                          <span>Add another card</span>
                        </Button>
                      </div>
                    )}
                  </Droppable>
                );
              })}
            </DragDropContext>
          </div>

          <button
            onClick={handleOpenAddColumnModal}
            className={clsx(
              styles.addColumnBtn,
              user?.theme === "dark" ? styles.addColumnBtnDark : null
            )}>
            <AddColumnPlus />
            <span>Add another column</span>
          </button>
        </div>
      </div>
    </div>
  );
}
