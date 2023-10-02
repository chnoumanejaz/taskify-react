import styled from 'styled-components';
import FormRow from '../../components/FormRow';
import Button from '../../components/Button';
import { LuLogIn } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import SpinnerMini from '../../components/SpinnerMini';
import useLogin from './useLogin';
import Input from '../../components/Input';
import { useState } from 'react';
import { toast } from 'react-toastify';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`;

const StyledLink = styled(Link)`
  color: var(--color-primary-200);
  text-decoration: underline;
  &:hover {
    color: var(--color-primary-500);
    text-decoration: none;
  }
`;

function LoginForm() {
  const [email, setEmail] = useState('chnoumanejaz@gmail.com');
  const [password, setPassword] = useState('12345678');
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim().length || !password.length) {
      toast.error('Please fill the required fields');
      return;
    }

    login(
      { email, password },
      {
        onSettled: () => {
          setPassword('');
          setEmail('');
        },
      }
    );
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <FormRow label="Email:" name="email">
          <Input
            type="email"
            placeholder="Enter your email"
            name="email"
            id='email'
            disabled={isLoading}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormRow>
        <FormRow label="Password:" name="password">
          <Input
            type="password"
            placeholder="Enter your password"
            name="password"
            id='password'
            disabled={isLoading}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormRow>
        <Button
          type="submit"
          disabled={isLoading}
          iconEnd={!isLoading && <LuLogIn />}
          iconStart={isLoading && <SpinnerMini />}>
          {isLoading ? 'Logging in ...' : 'Login'}
        </Button>
      </StyledForm>
      <p style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
        Don&apos;t have an account?
        <StyledLink to="/register">Register Now</StyledLink>
      </p>
    </>
  );
}

export default LoginForm;
