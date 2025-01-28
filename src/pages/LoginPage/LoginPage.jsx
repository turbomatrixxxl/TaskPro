import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

import "react-toastify/dist/ReactToastify.css";

import styles from "./LoginPage.module.css";

export default function LoginPage() {
  // Dependency array ensures the effect runs when these values change.

  return (
    <section className={styles.section}>
      <LoginForm />
    </section>
  );
}
