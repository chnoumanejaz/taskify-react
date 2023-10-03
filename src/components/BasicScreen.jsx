import styled from 'styled-components';
import Heading from './Heading';

const StyledMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  row-gap: 2rem;
  text-align: center;
  font-weight: 500;
  min-height: 80vh;
  & h1 {
    text-transform: uppercase;
  }
`;

/* eslint-disable react/prop-types */
function BasicScreen() {
  return (
    <StyledMessageContainer>
      <Heading as="h1">Select & Start</Heading>
      <p>Select from your projects and see what&apos;s in that 👻</p>
    </StyledMessageContainer>
  );
}

export default BasicScreen;
