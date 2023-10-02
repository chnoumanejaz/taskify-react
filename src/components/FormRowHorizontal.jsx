import styled from 'styled-components';

const StyledFormRowHorizontal = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-50);
  }

  & label {
    font-weight: 500;
  }
`;

const StyledError = styled.p`
  background-color: var(--color-red-700);
  border-radius: 0.5rem;
  color: var(--color-red-100);
  font-weight: 500;
  margin-top: -0.2rem;
  font-size: small;
  padding: 0.3rem 0.4rem;
  width: fit-content;
`;

/* eslint-disable react/prop-types */
function FormRowHorizontal({ name, label, error, children }) {
  return (
    <StyledFormRowHorizontal>
      <label htmlFor={name}>{label}</label>
      {children}
      {error && <StyledError>{error}</StyledError>}
    </StyledFormRowHorizontal>
  );
}

export default FormRowHorizontal;
