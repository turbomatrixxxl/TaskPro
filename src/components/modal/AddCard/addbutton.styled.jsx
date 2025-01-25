import styled from "styled-components";

export const Container = styled.button`
  height: 49px;
  display: flex;
  width: 302px;
  padding: 10px 0px 11px 0px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: #BEDBB0;  /* Schimbarea culorii de fundal */
  
  transition: background-color 200ms linear;
  
  /* Stilurile pentru hover și focus */
  &:hover,
  &:focus {
    background-color: ${props => props.theme.palette.text.error};
  }
`;

export const PlusIcon = styled.svg`
  width: 28px;   /* Dimensiunea dorită pentru icon */
  height: 28px;  /* Dimensiunea dorită pentru icon */
  flex-shrink: 0;
  fill: #161616; /* Culoarea iconului */
`;

export const TitleButton = styled.p`
  color: ${props => 
    props.variant === "column"
      ? props.theme.palette.text.primary
      : props.theme.palette.secondary.info};
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  margin-left: 8px;
`;
export const TitleText = styled.h1`
  color: #161616; 
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;
  margin-left: 8px; 
`;
