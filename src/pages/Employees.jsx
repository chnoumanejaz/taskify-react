import styled from 'styled-components';
import Heading from '../components/Heading';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { IoMdArrowRoundBack } from 'react-icons/io';
import AddNewEmployeeButton from '../components/AddNewEmployeeButton';
import { BiSearchAlt } from 'react-icons/bi';

import EmployeeCard from '../components/EmployeeCard';
import SelectButton from '../components/SelectButton';
import { useState } from 'react';
import { useGetEmployees } from '../features/employees/useGetEmployees';
import Spinner from '../components/Spinner';
import Input from '../components/Input';
import ErrorMessage from '../components/ErrorMessage';

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
// FIXME: seprate the search box from all pages and add as a component
export const InputContainer = styled.div`
  position: relative;
  & input {
    width: 100%;
    padding: 0.7rem 1.5rem;
    padding-left: 4rem;
  }
  & svg {
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    top: 0.8rem;
    left: 1rem;
    color: var(--color-primary-600);
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
      {/* FIXME: Change this and add the to prop in Button */}
      <Link to={-1}>
        <Button
          size="small"
          iconStart={<IoMdArrowRoundBack />}
          style={{ marginBottom: '2rem' }}>
          Back
        </Button>
      </Link>
      <HeaderEmployees>
        <Heading as="h1">Manage Your Employees </Heading>
        {employees?.length ? (
          <InputContainer>
            <Input
              type="text"
              placeholder="Search by name, phone"
              forr="mainPage"
              maxLength={100}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <BiSearchAlt />
          </InputContainer>
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
