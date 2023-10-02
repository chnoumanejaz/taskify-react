import styled, { css } from 'styled-components';

const ButtonIcon = styled.button`
  background: var(--color-primary-600);
  border: 1px solid var(--color-grey-100);
  padding: 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
  color: var(--color-primary-800);
  line-height: 0;

  ${props =>
    props.rounded === 'true' &&
    css`
      border-radius: 50%;
    `}

  &:hover {
    background-color: var(--color-primary-700);
  }
  ${props =>
    props.danger &&
    css`
      background: var(--color-red-700);
      &:hover {
        background: var(--color-red-800);
      }
      &:focus {
        outline: none;
      }
    `}

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-primary-50);
  }

  ${props =>
    props.size === 'small' &&
    css`
      padding: 0.5rem;
      & svg {
        width: 2rem;
        height: 2rem;
      }
    `}
`;

export default ButtonIcon;
