import styled from 'styled-components';
import { useDarkMode } from '../context/darkModeContext';
import CustomTooltip from './CustomTooltip';

const StyledLogo = styled.img`
  width: 180px;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();

  return (
    <CustomTooltip title='Click to go home'>
      <StyledLogo
        src={!isDarkMode ? '/logo-light.png' : '/logo-dark.png'}
        alt="Taskify logo"
      />
    </CustomTooltip>
  );
}

export default Logo;
