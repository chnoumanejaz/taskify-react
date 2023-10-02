import styled from 'styled-components';
import useGetUser from '../features/authentication/useGetUser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* eslint-disable react/prop-types */
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading: isGettingUser, isAuthenticated } = useGetUser();

  useEffect(() => {
    if (!isAuthenticated && !isGettingUser) navigate('/login');
  }, [isAuthenticated, isGettingUser, navigate]);

  if (isGettingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
