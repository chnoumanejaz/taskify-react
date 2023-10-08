import styled, { css } from 'styled-components';

const TableRow = styled.div`
  display: grid;
  // checkbox, priority, name, domain, date, assigned to, details btn
  grid-template-columns: 4rem 6rem 25rem 25rem 15rem 10rem 8rem;
  column-gap: 1rem;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--color-grey-100);
  font-size: 1.5rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & input {
    accent-color: var(--color-primary-500);
    width: 1.7rem;
    height: 1.7rem;
    cursor: pointer;
    &:focus {
      outline-offset: 0.1rem;
    }
    &:hover,
    &:checked {
      outline: 2px solid var(--color-primary-500);
      outline-offset: 0.1rem;
    }
  }

  & .priority {
    font-weight: 700;
    font-size: 2rem;
    letter-spacing: 0.1rem;
  }

  & img {
    max-width: 4rem;
    min-width: 4rem;
    max-height: 4rem;
    min-height: 4rem;
    border-radius: 50%;
    margin: 0 auto;
    border: 2px solid var(--color-primary-600);
  }

  ${props =>
    props.status &&
    css`
      text-decoration: line-through;
      background-color: var(--color-primary-100);
      opacity: 0.8;
      &:hover {
        background-color: var(--color-primary-100);
      }
    `}
`;

export default TableRow;
