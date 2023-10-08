import styled from 'styled-components';
import AddNewTaskButton from './AddNewTaskButton';
import FilterButton from './FilterButton';
import Heading from './Heading';
import SearchInputContainer from './SearchInputContainer';

const StyledTasksHeader = styled.div`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const HeaderButtonsContainer = styled.div`
  background-color: var(--color-grey-100);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
`;

/* eslint-disable react/prop-types */
function TasksHeader({ searchQuery, setSearchQuery, ...props }) {
  return (
    <StyledTasksHeader>
      <Heading as="h1">All Tasks</Heading>

      <HeaderActions>
        <HeaderButtonsContainer>
          <FilterButton value="all" label="All" {...props} />
          <FilterButton value="complete" label="Completed" {...props} />
          <FilterButton value="due" label="Due" {...props} />
        </HeaderButtonsContainer>
        <SearchInputContainer
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search by name, domain"
        />
      </HeaderActions>
      <AddNewTaskButton />
    </StyledTasksHeader>
  );
}

export default TasksHeader;
