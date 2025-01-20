import React from 'react';
import icons from '../../images/sprite.svg';
import {
  Container,
  Wrapper,
  Logo,
  LogoWrapper,
  Icon,
  Title,
  Text,
  AuthWrapper,
  AuthButton,
  AuthButtonLogin,
} from './Welcome.styled';

function Welcome() {
  return (
    <Container>
      <Wrapper>
        <Logo />
        <LogoWrapper>
          <Icon>
            <use href={`${icons}#logo`} />
          </Icon>
          <Title>Task Pro</Title>
        </LogoWrapper>
        <Text>
          Supercharge your productivity and take control of your tasks with Task
          Pro - Don't wait, start achieving your goals now!
        </Text>
        <AuthWrapper>
        <AuthButton to="register" className="register">
            Registration
          </AuthButton>
          <AuthButtonLogin to="login" className="login">
            Log In
          </AuthButtonLogin>
        </AuthWrapper>
      </Wrapper>
    </Container>
  );
}

export default Welcome;