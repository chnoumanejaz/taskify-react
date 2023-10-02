import styled from 'styled-components';

const StyledLogo = styled.img`
  width: 180px;
`;

function Logo() {
  return <StyledLogo src="/logo-light.png" alt="Taskify logo" />;
}

export default Logo;
