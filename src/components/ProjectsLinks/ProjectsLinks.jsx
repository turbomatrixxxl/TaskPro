import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import GetProjectIcons from "../../utils/GetProjectIcon";
import iconsSvg from "../../images/sprite.svg";

import clsx from "clsx";

import styles from "./ProjectsLinks.module.css";

export default function ProjectsLinks({ to, projectName, icon, theme }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                clsx(
                    styles.nav,
                    isActive ? theme === "light" ? styles.activeLinkLight : theme === "dark" ? styles.activeLinkDark : styles.activeLinkViolet : styles.link // Apply activeLink style if the link is active
                )
            }
        >
            {({ isActive }) => (
                <>
                    <div
                        className={clsx(
                            styles.leftCont,
                            theme === "light"
                                ? isActive
                                    ? styles.mainIconLightActive
                                    : styles.mainIconLight
                                : isActive
                                    ? styles.mainIconNormalActive
                                    : styles.mainIconNormal
                        )}
                    >
                        <GetProjectIcons
                            iconNumber={icon}
                            className={clsx(
                                styles.mainIcon,
                                theme === "light"
                                    ? isActive
                                        ? styles.mainIconLightActive
                                        : styles.mainIconLight
                                    : isActive
                                        ? styles.mainIconNormalActive
                                        : styles.mainIconNormal
                            )}
                        />
                        <p
                            className={clsx(
                                styles.mainText,
                                theme === "light"
                                    ? isActive
                                        ? styles.mainTextLightActive
                                        : styles.mainTextLight
                                    : isActive
                                        ? styles.mainTextNormalActive
                                        : styles.mainTextNormal
                            )}
                        >
                            {projectName}
                        </p>
                    </div>

                    {/* Right section - only show if active */}
                    {isActive && (
                        <div className={styles.rightCont}>
                            <div className={styles.projectIconCont}>
                                <svg
                                    className={clsx(
                                        styles.projectIcon,
                                        theme === "light" ? styles.projectIconLight : styles.projectIcon
                                    )}
                                >
                                    <use href={`${iconsSvg}#pencil`} />
                                </svg>
                                <svg
                                    className={clsx(
                                        styles.projectIcon,
                                        theme === "light" ? styles.projectIconLight : styles.projectIcon
                                    )}
                                >
                                    <use href={`${iconsSvg}#trash`} />
                                </svg>
                            </div>
                            <div
                                className={clsx(
                                    styles.rightMargin,
                                    theme === "violet" ? styles.rightMarginViolet : styles.rightMargin
                                )}
                            />
                        </div>
                    )}
                </>
            )}
        </NavLink>
    );
}

// Define propTypes for the component
ProjectsLinks.propTypes = {
    to: PropTypes.string.isRequired, // Required string for the navigation path
    projectName: PropTypes.string.isRequired, // Required string for the project name
    icon: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7]), // Valid range for the icon number
    theme: PropTypes.oneOf(["light", "dark", "violet"]), // Theme options
};
