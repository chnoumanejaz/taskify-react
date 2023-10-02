import styled from 'styled-components';
import FormRow from '../../components/FormRow';
import Button from '../../components/Button';
import { LuLogIn } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import useSignup from './useSignup';
import { useForm } from 'react-hook-form';
import SpinnerMini from '../../components/SpinnerMini';

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

function SignupForm() {
  const { register, reset, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;
  const { signUp, isLoading } = useSignup();

  function onSubmit({ fullname, password, email }) {
    signUp(
      {
        fullname,
        password,
        email,
      },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label="Name:"
          name="fullname"
          error={errors?.fullname?.message}>
          <Input
            disabled={isLoading}
            id="fullname"
            placeholder="Enter your full name"
            {...register('fullname', {
              required: 'Your name is required!',
              minLength: {
                value: 3,
                message: 'Minimum 3 characters required!',
              },
            })}
          />
        </FormRow>
        <FormRow label="Email:" name="email" error={errors?.email?.message}>
          <Input
            disabled={isLoading}
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required!',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please provide a valid email!',
              },
            })}
          />
        </FormRow>
        <FormRow
          label="Password: (min 8 characters)"
          name="password"
          error={errors?.password?.message}>
          <Input
            disabled={isLoading}
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register('password', {
              required: 'Password is required!',
              minLength: {
                value: 8,
                message: 'Password must be atleast of 8 digits!',
              },
            })}
          />
        </FormRow>
        <FormRow
          label="Re-Password:"
          name="repassword"
          error={errors?.repassword?.message}>
          <Input
            disabled={isLoading}
            type="password"
            id="repassword"
            placeholder="Enter your password again"
            {...register('repassword', {
              required: 'Please ReType your password it is required!',
              validate: value =>
                value === getValues().password || 'Password needs to be same!',
            })}
          />
        </FormRow>
        <Button
          type="submit"
          disabled={isLoading}
          iconStart={isLoading && <SpinnerMini />}
          iconEnd={!isLoading && <LuLogIn />}>
          {!isLoading ? 'Create account' : 'Creating account . . .'}
        </Button>
      </StyledForm>
      <p style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
        Already have an account?
        <StyledLink to="/login">Login</StyledLink>
      </p>
    </>
  );
}

export default SignupForm;
