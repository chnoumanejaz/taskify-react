import styled from "styled-components";

const LoginLayout = styled.main`
  background-color: var(--color-grey-0);
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.8)
    ),
    url('/loginbg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export default LoginLayout;
