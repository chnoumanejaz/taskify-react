import styled from 'styled-components';
import { useDarkMode } from '../context/darkModeContext';

const StyledLogo = styled.img`
  width: 180px;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();

  return (
    <StyledLogo
      src={!isDarkMode ? '/logo-light.png' : '/logo-dark.png'}
      alt="Taskify logo"
    />
  );
}

export default Logo;
