import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MdOutlineArrowBack } from 'react-icons/md';

const StyledBackButton = styled(Link)`
  background-color: var(--color-primary-600);
  color: var(--color-primary-50);
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0.5rem 1rem;
  font-weight: 500;
  gap: 0.5rem;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  & svg {
    width: 2rem;
    height: 2rem;
    transition: all 0.3s;
  }

  &:hover {
    background-color: var(--color-primary-700);
    & svg {
      transform: translateX(-0.4rem) scale(1.05);
    }
  }
`;

function BackButton() {
  return (
    <StyledBackButton to={-1}>
      <MdOutlineArrowBack /> Back
    </StyledBackButton>
  );
}

export default BackButton;
