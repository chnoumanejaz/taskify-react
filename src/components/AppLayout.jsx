import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import SideBar from './SideBar';
import styled, { css } from 'styled-components';
import useGetProjects from '../features/projects/useGetProjects';
import Spinner from './Spinner';
import BasicScreen from './BasicScreen';

const StyledAppLayout = styled.div`
  margin-top: 8rem;
`;

const Main = styled.main`
  padding: 1rem;
  ${props =>
    props.grid === 'true' &&
    css`
      padding: 1rem 1rem 1rem 31.5rem;
    `}
`;

function AppLayout() {
  const { isLoading: isGettingProjects, projects } = useGetProjects();
  const location = useLocation();
  const currentRoute = location.pathname;

  return (
    <>
      <NavBar />
      <StyledAppLayout>
        {isGettingProjects && currentRoute === '/home' ? (
          <Spinner message="Getting Projects ..." />
        ) : null}
        {projects?.length ? <SideBar /> : null}
        {projects?.length && currentRoute === '/home' ? (
          <Main grid={projects?.length && 'true'}>
            <BasicScreen />
          </Main>
        ) : null}
        {!isGettingProjects && (
          <Main grid={projects?.length && 'true'}>
            <Outlet />
          </Main>
        )}
      </StyledAppLayout>
    </>
  );
}

export default AppLayout;
