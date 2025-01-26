import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import { getBackground } from "../../utils/backgrounds";

import AddColumn from "../../components/modal/Addcolumn/AddColumn";
import EditColumn from "../../components/modal/EditColumn/EditColumn";

import styles from "./ProjectPage.module.css";

export default function ProjectPage() {
  const [showAddBoard, setShowAddBoard] = useState(false);
  const [showEditBoard, setShowEditBoard] = useState(false);

  const handlecloseAdd = () => {
    setShowAddBoard(false);
  };
  const handlecloseEdit = () => {
    setShowEditBoard(false);
  };

  const navigate = useNavigate();

  const { projectName } = useParams();
  // console.log(projectName);

  const { user } = useAuth();
  // console.log(user);

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

  return (
    <>
      {showAddBoard && <AddColumn onClose={handlecloseAdd} />}
      {showEditBoard && <EditColumn onClose={handlecloseEdit} />}

      <section
        style={sectionStyle} // Apply dynamic background
        className={styles.cont}>
        <button
          onClick={() => {
            setShowAddBoard(true);
          }}>
          AddColumn
        </button>
        <button
          onClick={() => {
            setShowEditBoard(true);
          }}>
          EditColumn
        </button>
        <h1>{project?.name || "project"}</h1>
      </section>
    </>
  );
}
