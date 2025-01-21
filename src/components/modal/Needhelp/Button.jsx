import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, TitleButton, TitleText } from "./button.styled"; 
import { useTheme } from "@mui/material";

const Button = ({
  btnTitle,
  onClick,
  btnColor = "#BEDBB0",
  isDisabled = false,
  variant = "default",
}) => {
  const theme = useTheme();
  const [pressed, setPressed] = useState(false);  // Starea pentru apăsare

  const handleMouseDown = () => {
    setPressed(true);  // Setează apăsarea pe true la click
  };

  const handleMouseUp = () => {
    setPressed(false);  // Resetează la normal după eliberarea clickului
  };

  return (
    <Container
      theme={theme}
      onClick={onClick}
      disabled={isDisabled}
      variant={variant}
      style={{
        backgroundColor: btnColor,
        transform: pressed ? "scale(0.98)" : "scale(1)",  // Reduce dimensiunea pentru efectul de apăsare
        boxShadow: pressed ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",  // Adaugă umbra pentru efectul de apăsare
        transition: "transform 0.2s, box-shadow 0.2s",  // Animație pentru transformări
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}  // Resetează la normal dacă mouse-ul părăsește butonul
    >
      <TitleText>Send</TitleText>
      <TitleButton theme={theme} variant={variant}>
        {btnTitle}
      </TitleButton>
    </Container>
  );
};

Button.propTypes = {
  btnTitle: PropTypes.string.isRequired,
  btnColor: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  variant: PropTypes.oneOf(["default", "column"]),
};

export default Button;
