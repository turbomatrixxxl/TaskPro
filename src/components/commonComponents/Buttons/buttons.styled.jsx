import styled from "styled-components";

const ButtonBase = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 36px;
  border-radius: 6px;
  border: none;
  background-color: ${(props) =>
    props.variant === "column"
      ? props.theme.palette.primary.error
      : props.theme.palette.secondary.info};
`;

const ButtonUpDateSvg = styled.use`
  width: 16px;
  height: 16px;
  stroke: inherit;
  fill: inherit;
`;

const ButtonClose = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const ButtonCloseIcon = styled.svg`
  width: 18px;
  height: 18px;
  fill: ${(props) => props.theme.palette.text.primary};
  stroke: ${(props) => props.theme.palette.text.primary};
`;

const ButtonCloseSvg = styled.use`
  width: 18px;
  height: 18px;
  fill: inherit;
`;

const ButtonFilter = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 74px;
  height: 25px;
  padding: 5px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.palette.background.paper};
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  stroke: ${(props) => props.theme.palette.text.primary};
`;

const ButtonFilterThumb = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ButtonFilterIcon = styled.svg`
  width: 20px;
  height: 20px;
  stroke: inherit;
`;

export {
  ButtonBase,
  ButtonUpDateSvg,
  ButtonClose,
  ButtonCloseIcon,
  ButtonCloseSvg,
  ButtonFilter,
  ButtonFilterThumb,
  ButtonFilterIcon,
};
