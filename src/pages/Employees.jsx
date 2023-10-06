import styled from 'styled-components';
import AddNewEmployeeButton from '../components/AddNewEmployeeButton';
import Heading from '../components/Heading';

import { useState } from 'react';
import BackButton from '../components/BackButton';
import EmployeeCard from '../components/EmployeeCard';
import ErrorMessage from '../components/ErrorMessage';
import SearchInputContainer from '../components/SearchInputContainer';
import SelectButton from '../components/SelectButton';
import Spinner from '../components/Spinner';
import { useGetEmployees } from '../features/employees/useGetEmployees';

const ManageAccountContainer = styled.div`
  padding: 1.5rem 2rem;
  margin-top: 2rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-grey-50);
  box-shadow: var(--shadow-sm);
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  & h2 {
    padding: 0 0 1rem 0;
    border-bottom: 1px solid var(--color-grey-50);
  }
`;

const HeaderEmployees = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & div label {
    margin-right: 1rem;
  }
`;

function Employees() {
  const [view, setView] = useState('minimal');
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoading: isGettingEmployees, employees } = useGetEmployees();

  const filteredData = employees?.filter(employee => {
    return (
      employee.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      employee.phone.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
  });

  return (
    <>
      <BackButton />
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
      <ManageAccountContainer>
        {employees?.length < 1 && (
          <Heading as="h3">There is no employee yet. </Heading>
        )}
        {!isGettingEmployees && filteredData?.length
          ? filteredData?.map(employee => (
              <EmployeeCard
                employee={employee}
                key={`employee-${employee.name}-${employee.id}`}
                view={view}
              />
            ))
          : null}
        {employees?.length && !filteredData?.length ? (
          <ErrorMessage
            message="No employee found for that query"
            query={searchQuery}
          />
        ) : null}
        {isGettingEmployees ? (
          <Spinner />
        ) : (
          <AddNewEmployeeButton view={view} />
        )}
      </ManageAccountContainer>
    </>
  );
}

export default Employees;
