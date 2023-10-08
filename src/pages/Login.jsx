import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Heading from '../components/Heading';
import LoginContainer from '../components/LoginContainer';
import LoginLayout from '../components/LoginLayout';
import Logo from '../components/Logo';
import Spinner from '../components/Spinner';
import LoginForm from '../features/authentication/LoginForm';
import useGetUser from '../features/authentication/useGetUser';

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
