import Input from './Input';
import TextArea from './Textarea';
import FormRowHorizontal from './FormRowHorizontal';
import SelectButton from './SelectButton';
import { useGetEmployees } from '../features/employees/useGetEmployees';
import Button from './Button';
import FileInput from './FileInput';
import ButtonsContainer from './ButtonsContainer';
import Modal from './Modal';
import AddNewEmployeeForm from './AddNewEmployeeForm';
import styled from 'styled-components';
import Heading from './Heading';
import { useForm } from 'react-hook-form';
import { useAddTask } from '../features/tasks/useAddTask';
import SpinnerMini from './SpinnerMini';
import { useParams } from 'react-router-dom';
import useGetUser from '../features/authentication/useGetUser';

const FormBody = styled.div`
  padding: 1rem 2rem;
  overflow-y: scroll;

  & h2 {
    padding-bottom: 0.5rem;
  }
  & form {
    padding-top: 1rem;
    border-top: 1px solid var(--color-grey-50);
  }
`;

/* eslint-disable react/prop-types */
function AddNewTaskForm({ onCloseModalSide }) {
  const { employees, isLoading: isGettingEmployees } = useGetEmployees();
  const { projectId } = useParams();
  const { addTask, isLoading: isAdding } = useAddTask();
  const { user } = useGetUser();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(data) {
    const fileUrl =
      typeof data.fileUrl === 'string' ? data.fileUrl : data.fileUrl[0];

    addTask(
      {
        ...data,
        fileUrl,
        forProject: projectId,
        created_by: user?.id,
      },
      {
        onSuccess: () => onCloseModalSide?.(),
      }
    );
  }

  return (
    <Modal>
      <FormBody>
        <Heading as="h2">Add a new task</Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormRowHorizontal
            label="Task Name:*"
            name="name"
            error={errors?.name?.message}>
            <Input
              type="text"
              placeholder="Enter the task name "
              id="name"
              forr="mainPage"
              disabled={isAdding}
              {...register('name', {
                required: 'Task name is required.',
              })}
            />
          </FormRowHorizontal>

          <FormRowHorizontal
            label="Task detail / description:"
            name="detail"
            error={errors?.detail?.message}>
            <TextArea
              id="detail"
              placeholder="Enter the description or details of task"
              rows={3}
              disabled={isAdding}
              {...register('detail')}
            />
          </FormRowHorizontal>
          <FormRowHorizontal
            label="Work Domain:*"
            name="domain"
            error={errors?.domain?.message}>
            <Input
              type="text"
              placeholder="Task domain e.g: designing, development"
              id="domain"
              forr="mainPage"
              disabled={isAdding}
              {...register('domain', {
                required: 'Please enter the task domain.',
              })}
            />
          </FormRowHorizontal>

          <FormRowHorizontal
            label="Assign to:*"
            name="assignto"
            error={errors?.assignedTo?.message}>
            {employees?.length ? (
              <>
                <SelectButton
                  id="assignto"
                  forr="mainPage"
                  {...register('assignedTo', {
                    required: 'Please Select an employee.',
                  })}
                  disabled={isGettingEmployees || isAdding}>
                  <option disabled>Select Employee</option>
                  {employees?.map(employee => (
                    <option value={employee.id} key={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </SelectButton>
              </>
            ) : (
              <Modal.Open openName="add-newEmployee">
                <Button type="button">
                  You dont have any employee (Add new employee)
                </Button>
              </Modal.Open>
            )}
          </FormRowHorizontal>

          <FormRowHorizontal
            label="Due Date:*"
            name="dueDate"
            error={errors?.dueDate?.message}>
            <Input
              type="date"
              forr="mainPage"
              id="dueDate"
              disabled={isAdding}
              {...register('dueDate', {
                required: 'Please select the due date for this task',
              })}
            />
          </FormRowHorizontal>

          <FormRowHorizontal
            label="Task Priority:"
            name="priority"
            error={errors?.priority?.message}>
            <SelectButton
              id="priority"
              forr="mainPage"
              disabled={isAdding}
              {...register('priority')}>
              <option disabled selected>
                Select Priority
              </option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </SelectButton>
          </FormRowHorizontal>

          <FormRowHorizontal
            label="Related Document:"
            name="file"
            error={errors?.fileUrl?.message}>
            <FileInput
              type="file"
              disabled={isAdding}
              accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              id="file"
              {...register('fileUrl', {
                required: 'Document reference is required.',
              })}
            />
          </FormRowHorizontal>

          <ButtonsContainer side="right" top="2rem">
            <Button
              variation="secondary"
              disabled={isAdding}
              type="reset"
              onClick={reset}>
              Cancle
            </Button>
            <Button
              type="submit"
              disabled={isAdding}
              iconStart={isAdding && <SpinnerMini />}>
              {isAdding ? 'Adding ...' : 'Add the task'}
            </Button>
          </ButtonsContainer>
        </form>

        <Modal.Window name="add-newEmployee">
          <AddNewEmployeeForm />
        </Modal.Window>
      </FormBody>
    </Modal>
  );
}

export default AddNewTaskForm;
