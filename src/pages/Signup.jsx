import styled from 'styled-components';
import Logo from '../components/Logo';
import SignupForm from '../features/authentication/SignupForm';
import Heading from '../components/Heading';

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

const SignupContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  width: 50%;
  height: 90vh;
  overflow-y: scroll;
  row-gap: 1rem;
  padding: 3rem 5rem;
  border-radius: 1rem;
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-grey-50);
  & img {
    filter: brightness(140%);
  }
  & div h1 {
    margin-bottom: 3rem;
  }
`;

function Signup() {
  return (
    <SignupLayout>
      <SignupContainer>
        <Logo />
        <div>
          <Heading as="h1">Create a new account</Heading>
          <SignupForm />
        </div>
      </SignupContainer>
    </SignupLayout>
  );
}

export default Signup;
