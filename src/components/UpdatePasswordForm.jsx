import Input from './Input';
import styled from 'styled-components';
import Button from './Button';
import ButtonsContainer from './ButtonsContainer';
import FormRowHorizontal from './FormRowHorizontal';
import { useForm } from 'react-hook-form';
import { useUpdateUser } from '../features/authentication/useUpdateUser';
import SpinnerMini from './SpinnerMini';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const { updateUser, isLoading: isUpdatingUser } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser(
      { password },
      {
        onSuccess: () => reset(),
      }
    );
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormRowHorizontal
        label="New Password: "
        name="password"
        error={errors?.password?.message}>
        <Input
          type="text"
          placeholder="Enter New Password (min 8 characters)"
          id="password"
          forr="mainPage"
          disabled={isUpdatingUser}
          {...register('password', {
            required: 'Password is required!',
            minLength: {
              value: 8,
              message: 'Password must be atleast of 8 characters!',
            },
          })}
        />
      </FormRowHorizontal>
      <FormRowHorizontal
        label="Confirm Password: "
        name="repassword"
        error={errors?.repassword?.message}>
        <Input
          type="password"
          placeholder="Re-Enter Password"
          id="repassword"
          forr="mainPage"
          disabled={isUpdatingUser}
          {...register('repassword', {
            required: 'This is the required field!',
            validate: value =>
              getValues().password === value || 'Password needs to be same!',
          })}
        />
      </FormRowHorizontal>
      <ButtonsContainer side="right">
        <Button
          type="reset"
          variation="secondary"
          onClick={reset}
          disabled={isUpdatingUser}>
          Cancle
        </Button>
        <Button
          type="submit"
          disabled={isUpdatingUser}
          iconStart={isUpdatingUser && <SpinnerMini />}>
          {isUpdatingUser ? 'Changing ...' : 'Change Password'}
        </Button>
      </ButtonsContainer>
    </StyledForm>
  );
}

export default UpdatePasswordForm;
