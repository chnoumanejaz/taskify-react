import styled, { css } from 'styled-components';

const Input = styled.input`
  padding: 1rem;
  border-radius: 0.5rem;
  border: none;
  color: var(--color-grey-800);
  font-weight: 500;
  font-size: 1.5rem;
  background-color: var(--color-grey-50);

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button{
    display: none;
  }

  ${props =>
    props.forr === 'mainPage' &&
    css`
      border: 2px solid var(--color-primary-500);
      color: var(--color-grey-700);
      font-weight: 500;
    `}
`;
export default Input;
