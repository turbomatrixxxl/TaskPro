import React from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

import styles from "./RegisterPage.module.css";

export default function RegisterPage() {
  return (
    <section className={styles.section}>
      <RegisterForm />
    </section>
  );
}
