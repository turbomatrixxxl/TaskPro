import React from "react";
import PropTypes from "prop-types";
import icon from "../../../../images/sprite.svg";
import { Container, PlusIcon, TitleButton } from "./addButton.styled";
import { useTheme } from "@mui/material";

export default function AddButton({
  data,
  btnTitle,
  btnColor,
    onClick,
  color,
  isDisabled = false,
  variant = "default", 
}) {
  const theme = useTheme();

  return (
    <Container
      theme={theme}
      onClick={onClick}
      disabled={isDisabled}
      variant={variant} 
      style={{ backgroundColor: btnColor }}
    > 
          <PlusIcon theme={theme} variant={variant} style={{ color }}>
        <use href={`${icon}#plus-1`}></use>
      </PlusIcon>
      <TitleButton theme={theme} variant={variant}>
        {btnTitle}
      </TitleButton>
    </Container>
  );
}

AddButton.propTypes = {
  data: PropTypes.object,
  btnTitle: PropTypes.string.isRequired,
  btnColor: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  variant: PropTypes.oneOf(["default", "column"]), 
};
