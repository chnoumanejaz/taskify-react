import styled, { css } from 'styled-components';

const StyledFilterButton = styled.button`
  border: none;
  outline: none;
  padding: 0.4rem 0.7rem;
  border-radius: 0.5rem;
  font-weight: 500;
  background-color: var(--color-grey-100);
  transition: all 0.3s;

  &:focus {
    outline: 2px solid var(--color-primary-500);
  }
  &:hover {
    background-color: var(--color-primary-500);
    color: var(--color-primary-50);
  }
  &:disabled {
    opacity: 1;
  }

  ${props =>
    props.active &&
    css`
      background-color: var(--color-primary-600);
      color: var(--color-primary-50);
    `}
`;

/* eslint-disable react/prop-types */
function FilterButton({ value, label, ...props }) {
  const { searchParams, setSearchParams, status, tasks } = props;

  //   Status of tasks
  const totalTasks = tasks?.length < 9 ? '0' + tasks?.length : tasks.length;
  const completed = tasks?.filter(task => task.status === 'complete').length;
  const totalCompleted = completed < 9 ? '0' + completed : completed;
  const totalDue =
    totalTasks - totalCompleted < 9
      ? '0' + (totalTasks - totalCompleted)
      : totalTasks - totalCompleted;

  function setTheStatus(value) {
    searchParams.set('status', value);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilterButton
      onClick={() => setTheStatus(value)}
      active={status === value || !status}
      disabled={status === value || !status}>
      {label}{' '}
      {value === 'all'
        ? totalTasks
        : value === 'complete'
        ? totalCompleted
        : totalDue}
    </StyledFilterButton>
  );
}

export default FilterButton;
