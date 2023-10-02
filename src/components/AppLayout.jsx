import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import SideBar from './SideBar';
import styled, { css } from 'styled-components';
// import WelcomeScreen from './WelcomeScreen';

const StyledAppLayout = styled.div`
  display: grid;
  ${props =>
    props.grid &&
    css`
      grid-template-columns: 300px 1fr;
    `}
`;

const Main = styled.main`
  padding: 1rem 2rem;
  min-height: 89.5vh;
`;

function AppLayout() {
  return (
    <>
      <NavBar />
      <StyledAppLayout>
        {/* <SideBar /> */}
        <Main>
          {/* <WelcomeScreen name="task" /> */}
          <Outlet />
        </Main>
      </StyledAppLayout>
    </>
  );
}

export default AppLayout;
