import styled from "styled-components";

export const Container = styled.button`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  max-width: 334px;
  height: 56px;
  border-radius: 8px;
  padding: 20px 18px;
  align-items: center;
  justify-content: center;
  transition: background-color 200ms linear;
  background-color: ${props => 
    props.variant === "column"
      ? props.theme.palette.background.paper
      : props.theme.palette.text.hint};

  &:hover,
  &:focus {
    background-color: ${props => props.theme.palette.text.error};
  }
`;

export const PlusIcon = styled.svg`
  width: 14px;
  height: 14px;
  stroke: ${props => 
    props.variant === "column"
      ? props.theme.palette.background.paper
      : props.theme.palette.secondary.error};
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
