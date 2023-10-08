import styled from 'styled-components';
import Heading from './Heading';
import SearchInputContainer from './SearchInputContainer';
import SelectButton from './SelectButton';

const HeaderEmployees = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & div label {
    margin-right: 1rem;
  }
`;

/* eslint-disable react/prop-types */
function EmployeesHeader({
  employees,
  searchQuery,
  setSearchQuery,
  view,
  setView,
}) {
  return (
    <HeaderEmployees>
      <Heading as="h1">Manage Your Employees </Heading>
      {employees?.length ? (
        <SearchInputContainer
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search by name, phone"
        />
      ) : null}
      <div>
        <label htmlFor="view">Select View:</label>
        <SelectButton
          style={{ padding: '0.7rem 1.5rem' }}
          id="view"
          value={view}
          onChange={e => setView(e.target.value)}>
          <option value="standard">Standard</option>
          <option value="minimal">Minimal</option>
        </SelectButton>
      </div>
    </HeaderEmployees>
  );
}

export default EmployeesHeader;
