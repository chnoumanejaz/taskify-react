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
import { useUpdateEmployee } from '../features/employees/useUpdateEmployee';

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
function AddNewEmployeeForm({ employeeToUpdate = {}, onCloseModal }) {
  const { user } = useGetUser();
  const { id: updateId, ...editValues } = employeeToUpdate;
  const isUpdatingSession = Boolean(updateId);
  const { isLoading: isAddingEmployee, addEmployee } = useAddEmployee();
  const { isLoading: isUpdatingEmployee, updateEmployee } = useUpdateEmployee();

  const isWorking = isAddingEmployee || isUpdatingEmployee;

  const buttonLabels = {
    true: {
      true: 'Updating ...',
      false: 'Update Employee',
    },
    false: {
      true: 'Adding ...',
      false: 'Add Employee',
    },
  };
  const renderButtonContent = buttonLabels[isUpdatingSession][isWorking];

  // BUG: give the width to any of the input field to set the modal overlapping in the browser mozilla

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: isUpdatingSession ? editValues : {},
  });

  function onSubmit(data) {
    const avatar =
      typeof data.avatarUrl === 'string' ? data.avatarUrl : data.avatarUrl[0];

    const modifiedData = { ...data, created_by: user?.id };

    if (isUpdatingSession)
      updateEmployee(
        {
          newEmployeeData: { ...data, avatarUrl: avatar },
          id: updateId,
        },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
    else
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
      <Heading as="h2">
        {isUpdatingSession ? 'Update an employee' : 'Add an employee'}
      </Heading>
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
            disabled={isWorking}
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
            disabled={isWorking}
            {...register('phone', {
              required: 'Employee phone number is necessary!',
              minLength: {
                value: 10,
                message: 'Enter a valid phone Number!',
              },
              maxLength: {
                value: 12,
                message: 'Please Enter a valid phone Number!',
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Employee Image:"
          name="avatar"
          error={errors?.avatarUrl?.message}>
          <p
            style={{
              fontSize: 'small',
              fontWeight: '500',
              position: 'absolute',
              right: '1rem',
              top: '.3rem',
              color: 'var(--color-primary-800)',
            }}>
            (Square size works best)
          </p>
          <FileInput
            type="file"
            id="avatar"
            accept="image/*"
            disabled={isWorking}
            {...register('avatarUrl', {
              required: isUpdatingSession
                ? false
                : 'Image is necessary as it makes it easy to find him 😉',
            })}
          />
        </FormRow>
        <ButtonsContainer side="right" top="2rem">
          <Button
            type="reset"
            variation="secondary"
            onClick={() => onCloseModal?.()}
            disabled={isWorking}>
            Cancle
          </Button>
          <Button
            type="submit"
            disabled={isWorking}
            iconStart={isWorking && <SpinnerMini />}>
            {renderButtonContent}
          </Button>
        </ButtonsContainer>
      </StyledForm>
    </StyledEmployeeFormContainer>
  );
}

export default AddNewEmployeeForm;
