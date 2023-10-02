import styled from 'styled-components';
import Heading from './Heading';
import FormRow from './FormRow';
import Input from './Input';
import FileInput from './FileInput';
import Button from './Button';
import ButtonsContainer from './ButtonsContainer';
import { useForm } from 'react-hook-form';
import useAddEmployee from '../features/employees/useAddEmployee';
import SpinnerMini from './SpinnerMini';
import useGetUser from '../features/authentication/useGetUser';

const StyledEmployeeFormContainer = styled.div`
  margin-top: 2rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

/* eslint-disable react/prop-types */
function AddNewEmployeeForm({ onCloseModal }) {
  const { user } = useGetUser();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { isLoading: isAddingEmployee, addEmployee } = useAddEmployee();

  function onSubmit(data) {
    const avatar =
      typeof data.avatarUrl === 'string' ? data.avatarUrl : data.avatarUrl[0];

    const modifiedData = { ...data, created_by: user?.id };

    addEmployee(
      {
        ...modifiedData,
        avatarUrl: avatar,
      },
      {
        onSuccess: () => {
          onCloseModal?.();
        },
      }
    );
  }

  return (
    <StyledEmployeeFormContainer>
      <Heading as="h2">Add an employee</Heading>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label="Name of Employee:"
          name="name"
          error={errors?.name?.message}>
          <Input
            type="text"
            placeholder="Employee name "
            id="name"
            forr="mainPage"
            disabled={isAddingEmployee}
            {...register('name', {
              required: 'Employee name is necessary!',
            })}
          />
        </FormRow>

        <FormRow
          label="Employee phone:"
          name="phone"
          error={errors?.phone?.message}>
          <Input
            type="number"
            placeholder="Employee phone no "
            id="phone"
            forr="mainPage"
            disabled={isAddingEmployee}
            {...register('phone', {
              required: 'Employee phone number is necessary!',
              minLength: {
                value: 10,
                message: 'Enter a valid phone Number!',
              },
              maxLength: {
                value: 12,
                message: 'Please Enter a vallid phone Number!',
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Employee Image:"
          name="avatar"
          error={errors?.avatarUrl?.message}>
          <FileInput
            type="file"
            id="avatar"
            accept="image/*"
            disabled={isAddingEmployee}
            {...register('avatarUrl', {
              required: 'Image is necessary as it makes it easy to find him 😉',
            })}
          />
        </FormRow>
        <ButtonsContainer side="right" top="2rem">
          <Button
            type="reset"
            variation="secondary"
            onClick={() => onCloseModal?.()}
            disabled={isAddingEmployee}>
            Cancle
          </Button>
          <Button
            type="submit"
            disabled={isAddingEmployee}
            iconStart={isAddingEmployee && <SpinnerMini />}>
            {isAddingEmployee ? 'Adding ...' : 'Add Employee'}
          </Button>
        </ButtonsContainer>
      </StyledForm>
    </StyledEmployeeFormContainer>
  );
}

export default AddNewEmployeeForm;
