import styled from 'styled-components';

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  position: relative;

  & label {
    font-weight: 500;
  }
`;

const StyledError = styled.p`
  background-color: var(--color-red-700);
  border-radius: 0 0 0.5rem 0.5rem;
  color: var(--color-red-100);
  font-weight: 500;
  margin-top: -0.3rem;
  font-size: small;
  padding: 0.3rem 0.4rem;
`;

/* eslint-disable react/prop-types */
function FormRow({ name, label, error, children }) {
  return (
    <StyledFormRow>
      <label htmlFor={name}>{label}</label>
      {children}
      {error && <StyledError>{error}</StyledError>}
    </StyledFormRow>
  );
}

export default FormRow;
