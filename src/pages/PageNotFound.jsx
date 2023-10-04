import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import { AiOutlineHome } from 'react-icons/ai';

const NotFound = styled.div`
  background-image: linear-gradient(
    to right bottom,
    var(--color-primary-200),
    var(--color-primary-100)
  );
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  & p {
    font-weight: 500;
    text-align: center;
  }
`;

const Oops = styled.div`
  font-size: 12rem;
  font-weight: 900;
  color: var(--color-primary-800);
  font-family: 'Mooli';
`;

const NotFoundMessage = styled.p`
  font-size: 2rem;
`;

function PageNotFound() {
  return (
    <NotFound>
      <Oops>
        Oops!
        <NotFoundMessage>404 - Page not found</NotFoundMessage>
      </Oops>
      <p>
        The page you are looking for might have been removed <br />
        or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button size="large" iconStart={<AiOutlineHome />}>
          Go to Home
        </Button>
      </Link>
    </NotFound>
  );
}

export default PageNotFound;
