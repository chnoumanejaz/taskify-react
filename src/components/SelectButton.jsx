import styled from 'styled-components';

const SelectButton = styled.select`
  padding: 1rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 1.5rem;
  background-color: var(--color-grey-50);
  border: 2px solid var(--color-primary-500);
  color: var(--color-grey-700);
  font-weight: 500;
  &:hover {
    background-color: var(--color-primary-100);
    color: var(--color-primary-800);
    cursor: pointer;
  }

  & option {
    background-color: var(--color-primary-100);
    color: var(--color-primary-800);
    font-weight: 500;
  }
`;
export default SelectButton;
