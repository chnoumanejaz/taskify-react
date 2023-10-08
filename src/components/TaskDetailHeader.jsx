import styled from 'styled-components';
import { calculateTimeDifference } from '../utils/calculateTimeDifference';
import { handleTheLongData } from '../utils/handleTheData';
import Heading from './Heading';

const TaskHead = styled.div`
  background-color: var(--color-grey-100);
  padding: 2rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  text-transform: capitalize;
  & h1 {
    font-size: 2.5rem;
  }

  & span {
    color: var(--color-grey-600);
    font-weight: 500;
  }
`;

const DueDate = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const StatusDisplay = styled.div`
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
`;

/* eslint-disable react/prop-types */
function TaskDetailHeader({ task }) {
  const { name, dueDate, status } = task;

  const colorsDueDate =
    calculateTimeDifference(dueDate) === 'Today'
      ? 'red'
      : calculateTimeDifference(dueDate) === 'Tomorrow'
      ? 'orange'
      : 'inherit';

  const colorStatus = {
    due: { bgColor: '#FCA5A5', color: '#B91C1C' },
    complete: { bgColor: '#86EFAC', color: '#15803D' },
  };

  return (
    <TaskHead>
      <div>
        <Heading as="h1">{handleTheLongData(name)}</Heading>
        <DueDate>
          <span>Due: </span>{' '}
          <p style={{ color: colorsDueDate }}>
            {calculateTimeDifference(dueDate)}
          </p>
        </DueDate>
      </div>
      <div>
        <StatusDisplay
          style={{
            color: colorStatus[status].color,
            backgroundColor: colorStatus[status].bgColor,
          }}>
          {status}
        </StatusDisplay>
      </div>
    </TaskHead>
  );
}

export default TaskDetailHeader;
