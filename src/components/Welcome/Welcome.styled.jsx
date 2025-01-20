import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import logoMob from '../../images/user2.png';
import logoDesk from '../../images/user.png';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: var(--welcome-bg-gradient);
  background-repeat: no-repeat;
  background-size: cover;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

export const Logo = styled.div`
  width: 124px;
  height: 124px;
  margin-bottom: 14px;
  background-image: url(${logoMob});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;

  @media screen and (min-width: 768px) {
    width: 162px;
    height: 162px;
    margin-bottom: 24px;
    background-image: url(${logoDesk});
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 14px;
`;

export const Icon = styled.svg`
  height: 40px;
  width: 40px;

  @media screen and (min-width: 768px) {
    height: 48px;
    width: 48px;
  }
`;

export const Title = styled.p`
  font-size: 28px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: -1.12px;
  color: var(--title-welcome-color);

  @media screen and (min-width: 768px) {
    font-size: 40px;
    letter-spacing: -1.6px;
  }
`;

export const Text = styled.p`
  width: 335px;
  margin-top: 25px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.28;
  letter-spacing: -0.28px;
  color: var(--text-primary-color);

  @media screen and (min-width: 768px) {
    width: 473px;
  }
`;

export const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  margin-top: 48px;

  & .login:hover + .register {
    background: transparent;
    color: var(--text-hover-welcome-color);
  }
`;

export const AuthButton = styled(NavLink)`
  width: 335px;
  padding: 14px 0;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: -0.28px;
  background: var(--bg-welcome-color);
  color: var(--text-hover-welcome-color);
  text-align: center;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-transform: none;

  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }

  @media screen and (min-width: 768px) {
    width: 344px;
  }
`;

export const AuthButtonLogin = styled(NavLink)`
  width: 335px;
  padding: 14px 0;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: -0.28px;
  color: var(--title-welcome-color);
  text-align: center;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-transform: none;

  &:hover {
    background: var(--bg-welcome-color);
    color: var(--text-hover-welcome-color);
  }

  &:active {
    transform: scale(0.95);
  }

  @media screen and (min-width: 768px) {
    width: 344px;
  }
`;
