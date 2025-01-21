// button.styled.js
import styled from "styled-components";

export const Container = styled.button`
  width: 352px;
  height: 49px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #BEDBB0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const TitleButton = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
`;

export const TitleText = styled.span`
 color: #161616;
font-family: Poppins;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;
letter-spacing: -0.28px;
`;
