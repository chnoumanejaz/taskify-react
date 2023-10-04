import styled from 'styled-components';
import Button from './Button';
import { MdOutlineCreateNewFolder, MdAddTask } from 'react-icons/md';
import Heading from './Heading';
import Modal from './Modal';
import AddProjectForm from './AddProjectForm';
import ModalSide from './ModalSide';
import AddNewTaskForm from './AddNewTaskForm';

const StyledMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  row-gap: 3rem;
  text-align: center;
  font-weight: 500;
  min-height: 80vh;
  & h1 {
    text-transform: uppercase;
  }
  & .span {
    color: var(--color-primary-600);
    font-size: 2rem;
    font-weight: 600;
    position: relative;
    &::after {
      content: '';
      width: 90%;
      height: 30%;
      background-color: var(--color-primary-600);
      position: absolute;
      bottom: 1px;
      left: 0;
      opacity: 0.3;
    }
  }
`;

/* eslint-disable react/prop-types */
function WelcomeScreen({ name = 'project' }) {
  return (
    <Modal>
      <StyledMessageContainer>
        <div>
          <Heading as="h1">
            {name === 'project' ? '👋 Welcome' : '😉 Add tasks'}
          </Heading>
          <p>
            <span className="span">Taskify </span> enables effortless project
            management.
          </p>
          <p>
            {name === 'task'
              ? 'Start adding your tasks'
              : 'Start by creating your 1st project'}
          </p>
        </div>
        {name === 'project' ? (
          <Modal.Open openName="create-project">
            <Button iconEnd={<MdOutlineCreateNewFolder />}>
              Create new project
            </Button>
          </Modal.Open>
        ) : (
          <ModalSide>
            <ModalSide.Open openName="add-task">
              <Button iconEnd={<MdAddTask />}>Add a Task</Button>
            </ModalSide.Open>

            <ModalSide.Window name="add-task">
              <AddNewTaskForm />
            </ModalSide.Window>
          </ModalSide>
        )}
      </StyledMessageContainer>

      <Modal.Window name="create-project">
        <AddProjectForm />
      </Modal.Window>
    </Modal>
  );
}

export default WelcomeScreen;
