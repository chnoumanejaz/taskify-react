import styled from 'styled-components';
import Heading from './Heading';
import FormRow from './FormRow';
import Input from './Input';
import Button from './Button';
import ButtonsContainer from './ButtonsContainer';
import { useForm } from 'react-hook-form';
import TextArea from './Textarea';
import { useAddProject } from '../features/projects/useAddProject';
import SpinnerMini from './SpinnerMini';
import useGetUser from '../features/authentication/useGetUser';
import useUpdateProject from '../features/projects/useUpdateProject';

const StyledProjectFormContainer = styled.div`
  margin-top: 2rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

/* eslint-disable react/prop-types */
function AddProjectForm({ projectToUpdate = {}, onCloseModal }) {
  const { user } = useGetUser();
  const { id: updateId, ...editValues } = projectToUpdate;
  const isUpdatingSession = Boolean(updateId);
  const { isLoading: isCreating, createProject } = useAddProject();
  const { isLoading: isUpdating, updateProject } = useUpdateProject();

  const isWorking = isCreating || isUpdating;

  const buttonLabels = {
    true: {
      true: 'Updating ...',
      false: 'Update Project',
    },
    false: {
      true: 'Creating ...',
      false: 'Create Project',
    },
  };

  const renderButtonContent = buttonLabels[isUpdatingSession][isWorking];

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: isUpdatingSession ? editValues : {},
  });

  function onSubmit(data) {
    const modifiedData = { ...data, created_by: user?.id };

    if (isUpdatingSession)
      updateProject(
        {
          newProjectData: { ...data },
          id: updateId,
        },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
    else
      createProject(
        {
          ...modifiedData,
        },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
  }

  return (
    <StyledProjectFormContainer>
      <Heading as="h2">
        {isUpdatingSession ? 'Update Project' : 'Create new project'}
      </Heading>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label="Name of Project:"
          name="name"
          error={errors?.name?.message}>
          <Input
            type="text"
            placeholder="Project name "
            id="name"
            forr="mainPage"
            disabled={isWorking}
            {...register('name', {
              required: 'Project name is necessary!',
            })}
          />
        </FormRow>

        <FormRow
          label="Project category:"
          name="category"
          error={errors?.category?.message}>
          <span
            style={{
              position: 'absolute',
              fontSize: 'small',
              color: 'var(--color-primary-600)',
              right: '2rem',
              top: '.3rem',
              fontWeight: '500',
            }}>
            (e.g: Development, Designing ...)
          </span>
          <Input
            type="text"
            placeholder="Project category"
            id="category"
            forr="mainPage"
            disabled={isWorking}
            {...register('category', {
              required: 'Project category is necessary!',
            })}
          />
        </FormRow>

        <FormRow
          label="Project description:"
          name="description"
          error={errors?.description?.message}>
          <TextArea
            type="text"
            placeholder="Project description"
            id="description"
            disabled={isWorking}
            cols={40}
            rows={3}
            {...register('description', {
              required: 'Project description  is necessary!',
            })}
          />
        </FormRow>

        <ButtonsContainer side="right" top="2rem">
          <Button
            type="reset"
            variation="secondary"
            disabled={isWorking}
            onClick={() => onCloseModal?.()}>
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
    </StyledProjectFormContainer>
  );
}

export default AddProjectForm;
