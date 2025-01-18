import React from "react";
import PropTypes from "prop-types";
import icon from "../../../images/sprite.svg";
import {
  ButtonUpDateSvg,
  ButtonClose,
  ButtonCloseIcon,
  ButtonFilter,
  ButtonFilterIcon,
  ButtonFilterThumb,
} from "./buttons.styled";
import { useTheme } from "@mui/material";


export const BtnClose = ({ variant = "default" }) => {
  const theme = useTheme();

  const iconId = variant === "black" ? "#x-close-2" : "#x-close";

  return (
    <ButtonClose>
      <ButtonCloseIcon theme={theme} > 
        <ButtonUpDateSvg href={`${icon}${iconId}`}></ButtonUpDateSvg>
      </ButtonCloseIcon>
    </ButtonClose>
  );
};

export const BtnFilter = ({ color, onClick }) => {
  const theme = useTheme();

  return (
    <ButtonFilter onClick={onClick} theme={theme} style={{ color }}>
      <ButtonFilterThumb>
        <ButtonFilterIcon>
          <use href={`${icon}#filter`}></use>
        </ButtonFilterIcon>
      </ButtonFilterThumb>
      Filter
    </ButtonFilter>
  );
};

BtnClose.propTypes = {
  variant: PropTypes.oneOf(["default", "black"]), 
};

BtnFilter.propTypes = {
  color: PropTypes.string, 
  onClick: PropTypes.func.isRequired, 
};
