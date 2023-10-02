import styled from 'styled-components';
import Logo from '../components/Logo';
import LoginForm from '../features/authentication/LoginForm';
import Heading from '../components/Heading';
import useGetUser from '../features/authentication/useGetUser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

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

const LoginContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  width: 50%;
  row-gap: 1rem;
  padding: 8rem 5rem;
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

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Login() {
  const { isLoading, isAuthenticated } = useGetUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !isLoading) navigate('/', { replace: true });
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (!isAuthenticated && !isLoading)
    return (
      <LoginLayout>
        <LoginContainer>
          <Logo />
          <div>
            <Heading as="h1">Login to your account</Heading>
            <LoginForm />
          </div>
        </LoginContainer>
      </LoginLayout>
    );
}

export default Login;
