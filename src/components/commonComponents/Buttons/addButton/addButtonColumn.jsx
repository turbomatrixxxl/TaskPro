import React from "react";
import PropTypes from "prop-types";
import icon from "../../../../images/sprite.svg";
import { Container, PlusIcon, TitleButton } from "./addButton.styled";
import { useTheme } from "@mui/material";

export default function AddButtonColumn({
  data,
  btnTitle,
  btnColor,
    onClick,
  color
}) {
  const theme = useTheme();

  return (
    <Container
      theme={theme}
      onClick={onClick}
      variant="column" 
      style={{ backgroundColor: btnColor }}
    >
      <PlusIcon theme={theme} variant="column" style={{ color }}>
        <use href={`${icon}#plus-1`}></use>
      </PlusIcon>
      <TitleButton theme={theme} variant="column">
        {btnTitle}
      </TitleButton>
    </Container>
  );
}

AddButtonColumn.propTypes = {
  data: PropTypes.object,
  btnTitle: PropTypes.string.isRequired,
  btnColor: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
