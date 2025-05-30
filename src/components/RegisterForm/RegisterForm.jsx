import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operationsAuth";

import { Link } from "react-router-dom";

import Input from "../commonComponents/Input/Input";
import Button from "../commonComponents/Button";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { VscEye, VscEyeClosed } from "react-icons/vsc";

import useToggle from "../../hooks/useToggle";
import useFormValidation from "../../hooks/useFormValidation";
import validateRegister from "../../hooks/validateRegister";
import useFormTouched from "../../hooks/useFormTouched";
import usePasswordStrength from "../../hooks/usePasswordStrength";

import styles from "./RegisterForm.module.css";

function RegisterForm() {
  const { fields, setFields, validateFields } = useFormValidation(
    {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validateRegister
  );

  const { touched, handleBlur } = useFormTouched();
  const passwordStrength = usePasswordStrength(fields.password);

  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const [type, setType] = useState("password");
  const [eyeVisible, toggleEyeVisible] = useToggle(true);
  const [closedEyeVisible, toggleClosedEyeVisible] = useToggle(false);

  const [confirmType, setConfirmType] = useState("password");
  const [confirmEyeVisible, toggleConfirmEyeVisible] = useToggle(true);
  const [confirmClosedEyeVisible, toggleConfirmClosedEyeVisible] =
    useToggle(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    const { passwordConfirm, ...fieldsWithoutPasswordConfirm } = fields;

    dispatch(register(fieldsWithoutPasswordConfirm))
      .unwrap()
      .then(() => {
        setFields({
          username: "",
          email: "",
          password: "",
          passwordConfirm: "",
        });
        toast.success("Registration successful!");
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Account with this email already exists.");
        toast.error("Account with this email already exists.");
      });
  };

  return (
    <div className={styles.cont}>
      <div className={styles.linkContainer}>
        <p className={styles.login}>Registration</p>

        <Link to="/auth/login" className={styles.navLinkTitle}>
          Log In
        </Link>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputs}>
          <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
              <Input
                autoComplete="on"
                paddingLeft="18px"
                width="100%"
                type={"text"}
                value={fields.username}
                handleChange={(e) => {
                  setFields({ ...fields, username: e.target.value });
                }}
                handleBlur={handleBlur("username")}
                placeholder="Name"
                required={true}
              />
            </div>
            {touched.username && !fields.username && (
              <p className={styles.inputError}>Required</p>
            )}
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
              <Input
                autoComplete="on"
                paddingLeft="18px"
                width="100%"
                type="email"
                value={fields.email}
                handleChange={(e) => {
                  setFields({ ...fields, email: e.target.value });
                }}
                handleBlur={handleBlur("email")}
                placeholder="E-mail"
                required={true}
              />
            </div>
            {touched.email && !fields.email && (
              <p className={styles.inputError}>Required</p>
            )}
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
              {eyeVisible && (
                <VscEye
                  onClick={() => {
                    toggleEyeVisible();
                    toggleClosedEyeVisible();
                    setType("text");
                  }}
                  size="24px"
                  className={styles.eyeIcon}
                />
              )}
              {closedEyeVisible && (
                <VscEyeClosed
                  onClick={() => {
                    toggleEyeVisible();
                    toggleClosedEyeVisible();
                    setType("password");
                  }}
                  size="24px"
                  className={styles.eyeIcon}
                />
              )}
              <Input
                autoComplete="on"
                paddingLeft="18px"
                width="100%"
                type={type}
                value={fields.password}
                handleChange={(e) => {
                  setFields({ ...fields, password: e.target.value });
                }}
                handleBlur={handleBlur("password")}
                placeholder="Password"
                required={true}
              />
            </div>
            {touched.password && !fields.password && (
              <p className={styles.inputError}>Required</p>
            )}
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
              {confirmEyeVisible && (
                <VscEye
                  onClick={() => {
                    toggleConfirmEyeVisible();
                    toggleConfirmClosedEyeVisible();
                    setConfirmType("text");
                  }}
                  size="24px"
                  className={styles.eyeIcon}
                />
              )}
              {confirmClosedEyeVisible && (
                <VscEyeClosed
                  onClick={() => {
                    toggleConfirmEyeVisible();
                    toggleConfirmClosedEyeVisible();
                    setConfirmType("password");
                  }}
                  size="24px"
                  className={styles.eyeIcon}
                />
              )}
              <Input
                autoComplete="on"
                paddingLeft="18px"
                width="100%"
                type={confirmType}
                value={fields.passwordConfirm}
                handleChange={(e) =>
                  setFields({ ...fields, passwordConfirm: e.target.value })
                }
                handleBlur={handleBlur("passwordConfirm")}
                placeholder="Confirm Password"
                required={true}
              />
            </div>
            {touched.passwordConfirm && !fields.passwordConfirm && (
              <p className={styles.inputError}>Required</p>
            )}
            {touched.passwordConfirm &&
              fields.password !== fields.passwordConfirm && (
                <p className={styles.inputError}>Passwords must match</p>
              )}
          </div>
          <div className={styles.passwordStrengthBar}>
            <div
              className={styles.passwordStrengthIndicator}
              style={{
                width: `${(passwordStrength / 5) * 100}%`,
                backgroundColor:
                  passwordStrength < 3
                    ? "red"
                    : passwordStrength < 4
                    ? "orange"
                    : "green",
              }}></div>
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          <Button variant="auth" type="submit">
            Register Now
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
