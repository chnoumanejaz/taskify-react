import styled from 'styled-components';
import '../styles/spinner.css';
import Heading from './Heading';

const SpinContainer = styled.div`
  display: grid;
  place-items: center;
  & h3 {
    margin: 0 auto;
  }
`;

/* eslint-disable react/prop-types */
function Spinner({ message = '' }) {
  return (
    <SpinContainer>
      <div className="loader"></div>
      <Heading as="h3">{message}</Heading>
    </SpinContainer>
  );
}

export default Spinner;
