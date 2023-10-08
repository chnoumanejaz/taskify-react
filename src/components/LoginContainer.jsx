import styled from 'styled-components';

const LoginContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  width: 50%;
  row-gap: 1rem;
  padding: 8rem 5rem;
  border-radius: 1rem;
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-primary-50);
  & img {
    filter: brightness(140%);
  }
  & div h1 {
    margin-bottom: 3rem;
  }
`;

export default LoginContainer;
