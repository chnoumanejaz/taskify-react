import styled from 'styled-components';
import ButtonsContainer from './ButtonsContainer';
import Button from './Button';
import { BiArrowBack, BiEdit } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import Modal from './Modal';
import ModalSide from './ModalSide';
import ConfirmDelete from './ConfirmDelete';
import { useDeleteTask } from '../features/tasks/useDeleteTask';
import { useNavigate } from 'react-router-dom';
import AddNewTaskForm from './AddNewTaskForm';

const StyledTaskDetailButtons = styled.div`
  padding: 2rem;
  margin-top: 2rem;
  font-weight: 500;
`;

/* eslint-disable react/prop-types */
function TaskDetailButtons({ task }) {
  console.log(task);
  const { name: taskName, id } = task;

  const { isLoading, deleteTask } = useDeleteTask();
  const navigate = useNavigate();

  return (
    <StyledTaskDetailButtons>
      <ButtonsContainer side="right">
        <Button
          variation="secondary"
          iconStart={<BiArrowBack />}
          onClick={() => navigate(-1)}>
          Go Back
        </Button>

        <Modal>
          <Modal.Open openName="delete-task">
            <Button variation="danger" iconStart={<MdDeleteOutline />}>
              Delete Task
            </Button>
          </Modal.Open>
          <Modal.Window name="delete-task">
            <ConfirmDelete
              selected="task"
              resource={taskName}
              disabled={isLoading}
              onConfirm={() => {
                deleteTask(id, {
                  onSuccess: () => navigate(-1),
                });
              }}
            />
          </Modal.Window>
        </Modal>

        <ModalSide>
          <ModalSide.Open openName="update-task">
            <Button iconStart={<BiEdit />}>Update Task</Button>
          </ModalSide.Open>

          <ModalSide.Window name="update-task" heading={`Update task (${taskName})`}>
            <AddNewTaskForm taskToUpdate={task} />
          </ModalSide.Window>
        </ModalSide>
      </ButtonsContainer>
    </StyledTaskDetailButtons>
  );
}

export default TaskDetailButtons;
