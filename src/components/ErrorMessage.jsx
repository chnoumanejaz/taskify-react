import styled from 'styled-components';

const StyledErrorMessage = styled.div`
  text-transform: none;
  font-weight: 500;
  text-align: center;
  & span {
    color: var(--color-primary-600);
    display: block;
  }
`;

const Emoji = styled.div`
  font-size: 2.2rem;
  margin-top: 1rem;
`;

/* eslint-disable react/prop-types */
function ErrorMessage({ message, query = '' }) {
  return (
    <StyledErrorMessage>
      {message} {query.length ? <span> ({query}) </span> : null}
      <Emoji>😥</Emoji>
    </StyledErrorMessage>
  );
}

export default ErrorMessage;
