import { isBefore, parseISO, startOfDay } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useGetUser from '../features/authentication/useGetUser';
import { useGetEmployees } from '../features/employees/useGetEmployees';
import { useAddTask } from '../features/tasks/useAddTask';
import { useUpdateTask } from '../features/tasks/useUpdateTask';
import { handleTheShortData } from '../utils/handleTheData';
import Button from './Button';
import ButtonsContainer from './ButtonsContainer';
import FileInput from './FileInput';
import FormRowHorizontal from './FormRowHorizontal';
import Heading from './Heading';
import Input from './Input';
import SelectButton from './SelectButton';
import SpinnerMini from './SpinnerMini';
import TextArea from './Textarea';

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
function AddNewTaskForm({ onCloseModalSide, taskToUpdate = {} }) {
  const { id: updateId, ...editValues } = taskToUpdate;
  const isUpdatingSession = Boolean(updateId);

  const navigate = useNavigate();
  const { user } = useGetUser();
  const { employees, isLoading: isGettingEmployees } = useGetEmployees();
  const { projectId } = useParams();
  const { addTask, isLoading: isAddingTask } = useAddTask();
  const { isLoading: isUpdatingTask, updateTask } = useUpdateTask();

  const isWorking = isAddingTask || isUpdatingTask;

  const buttonLabels = {
    true: {
      true: 'Updating ...',
      false: 'Update Task',
    },
    false: {
      true: 'Adding ...',
      false: 'Add Task',
    },
  };
  const renderButtonContent = buttonLabels[isUpdatingSession][isWorking];

  const dateNotInPast = selectedDate => {
    const today = startOfDay(new Date());
    const parsedSelectedDate = startOfDay(parseISO(selectedDate));
    return isBefore(parsedSelectedDate, today)
      ? 'Due date must be today or in the future.'
      : true;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: isUpdatingSession ? editValues : {},
  });

  function onSubmit(data) {
    console.log(data);
    const fileUrl =
      typeof data.fileUrl === 'string' ? data.fileUrl : data.fileUrl[0];
    if (isUpdatingSession)
      updateTask(
        {
          newTaskData: { ...data, fileUrl },
          id: updateId,
        },
        {
          onSuccess: () => {
            onCloseModalSide?.();
          },
        }
      );
    else
      addTask(
        {
          ...data,
          fileUrl,
          forProject: projectId,
          status: 'due',
          created_by: user?.id,
        },
        {
          onSuccess: () => onCloseModalSide?.(),
        }
      );
  }

  return (
    <FormBody>
      <Heading as="h2">
        {isUpdatingSession ? 'Update the task' : 'Add a new task'}
      </Heading>

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
            disabled={isWorking || !employees?.length}
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
            disabled={isWorking || !employees?.length}
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
            disabled={isWorking || !employees?.length}
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
                disabled={isGettingEmployees || isWorking}>
                <option disabled>Select Employee</option>
                {employees?.map(employee => (
                  <option value={employee.id} key={employee.id}>
                    {handleTheShortData(employee.name)}
                  </option>
                ))}
              </SelectButton>
            </>
          ) : (
            <Button
              type="button"
              disabled={isGettingEmployees}
              onClick={() => navigate('/employee')}>
              {isGettingEmployees
                ? 'Getting your employees ...'
                : 'You dont have any employee (Add new employee)'}
            </Button>
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
            disabled={isWorking || !employees?.length}
            {...register('dueDate', {
              required: 'Please select the due date for this task',
              validate: dateNotInPast,
            })}
          />
        </FormRowHorizontal>

        <FormRowHorizontal label="Task Priority:" name="priority">
          <SelectButton
            id="priority"
            forr="mainPage"
            disabled={isWorking || !employees?.length}
            {...register('priority')}>
            <option disabled selected value="no">
              Select Priority
            </option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </SelectButton>
        </FormRowHorizontal>

        {isUpdatingSession ? (
          <FormRowHorizontal label="Task Status:" name="Status">
            <SelectButton
              id="Status"
              forr="mainPage"
              disabled={isWorking}
              {...register('status')}>
              <option disabled selected value="no">
                Select Status
              </option>
              <option value="complete">Complete</option>
              <option value="due">Due</option>
            </SelectButton>
          </FormRowHorizontal>
        ) : null}

        <FormRowHorizontal
          label="Related Document:"
          name="file"
          error={errors?.fileUrl?.message}>
          <FileInput
            type="file"
            disabled={isWorking || !employees?.length}
            accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            id="file"
            {...register('fileUrl', {
              required: isUpdatingSession
                ? false
                : 'Document reference is required.',
            })}
          />
        </FormRowHorizontal>

        <ButtonsContainer side="right" top="2rem">
          <Button
            variation="secondary"
            disabled={isWorking}
            type="reset"
            onClick={() => onCloseModalSide?.()}>
            Cancle
          </Button>
          <Button
            type="submit"
            disabled={isWorking || !employees?.length}
            iconStart={isWorking && <SpinnerMini />}>
            {renderButtonContent}
          </Button>
        </ButtonsContainer>
      </form>
    </FormBody>
  );
}

export default AddNewTaskForm;
