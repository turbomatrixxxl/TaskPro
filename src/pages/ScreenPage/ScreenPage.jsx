import React from "react";
import { useAuth } from "../../hooks/useAuth";
import clsx from "clsx";

import styles from "./ScreenPage.module.css";


export default function ScreenPage() {
    const { user } = useAuth();

    return (
        <div
            className={clsx(
                styles.cont,
                user?.theme === "dark" ? styles.dark : styles.cont
            )}
        >
            <p className={clsx(styles.text, user?.theme === "dark" ? styles.darkText : styles.text)}>
                Before starting your project, it is essential <span className={clsx(user?.theme === "violet" ? styles.violetSpan : styles.span)} >to create a board</span> to
                visualize and track all the necessary tasks and milestones. This board
                serves as a powerful tool to organize the workflow and ensure effective
                collaboration among team members.
            </p>
        </div>
    );
}

