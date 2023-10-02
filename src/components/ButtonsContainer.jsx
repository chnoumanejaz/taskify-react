import styled, { css } from 'styled-components';

const StyledButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;

  ${props =>
    props.side === 'right' &&
    css`
      justify-content: flex-end;
    `}

  ${props =>
    props.top === '2rem' &&
    css`
      margin-top: 2rem;
    `}
`;

/* eslint-disable react/prop-types */
function ButtonsContainer({ side, children, top }) {
  return (
    <StyledButtonsContainer side={side} top={top}>
      {children}
    </StyledButtonsContainer>
  );
}

export default ButtonsContainer;
