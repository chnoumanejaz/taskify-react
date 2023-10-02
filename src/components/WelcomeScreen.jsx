import styled from 'styled-components';
import Button from './Button';
import { MdOutlineCreateNewFolder, MdAddTask } from 'react-icons/md';
import Heading from './Heading';

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
      <Button
        iconEnd={
          name === 'project' ? <MdOutlineCreateNewFolder /> : <MdAddTask />
        }>
        {name === 'task' ? 'Add a task' : 'Create new project'}
      </Button>
    </StyledMessageContainer>
  );
}

export default WelcomeScreen;
