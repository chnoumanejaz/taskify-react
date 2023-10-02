import styled from 'styled-components';

const FileInput = styled.input`
  font-size: 1.4rem;
  border-radius: 0.5rem;
  font-weight: 500;

  &::file-selector-button {
    font: inherit;
    font-weight: inherit;
    padding: 1rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: 0.5rem;
    border: none;
    color: var(--color-primary-50);
    background-color: var(--color-primary-600);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-primary-700);
    }
  }
`;

export default FileInput;
