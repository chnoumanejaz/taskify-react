import styled, { css } from 'styled-components';

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 600;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 600;
  `,
};

const variations = {
  primary: css`
    color: var(--color-primary-50);
    background-color: var(--color-primary-600);

    &:hover {
      background-color: var(--color-primary-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-100);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-200);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const StyledButton = styled.button`
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  border: 1px solid transparent;

  & svg {
    width: 2.2rem;
    height: 2.2rem;
  }

  ${props => sizes[props.size]}
  ${props => variations[props.variation]}
`;

/* eslint-disable react/prop-types */
function Button({ children, iconStart, iconEnd, size, variation, ...props }) {
  return (
    <StyledButton {...props} size={size} variation={variation}>
      {iconStart}
      <span>{children}</span>
      {iconEnd}
    </StyledButton>
  );
}

export default Button;

Button.defaultProps = {
  variation: 'primary',
  size: 'medium',
};
