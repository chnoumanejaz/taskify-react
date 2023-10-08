import styled from "styled-components";

const SignupLayout = styled.main`
  background-color: var(--color-grey-0);
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.9),
      rgba(0, 0, 0, 0.6)
    ),
    url('/signupbg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export default SignupLayout