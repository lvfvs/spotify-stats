import styled from "styled-components/macro";

const LoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginButton = styled.a`
  color: black;
  text-decoration: none;
  font-family: var(--font);

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => (
  <LoginContainer>
    <LoginButton href="http://localhost:8888/login">
      Login to Spotify
    </LoginButton>
  </LoginContainer>
);

export default Login;
