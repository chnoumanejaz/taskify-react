import styled from 'styled-components';
import Heading from '../components/Heading';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { IoMdArrowRoundBack } from 'react-icons/io';
import AddNewEmployeeButton from '../components/AddNewEmployeeButton';
import EmployeeCard from '../components/EmployeeCard';
import SelectButton from '../components/SelectButton';
import { useState } from 'react';
import { useGetEmployees } from '../features/employees/useGetEmployees';
import Spinner from '../components/Spinner';

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

  const { isLoading: isGettingEmployees, employees } = useGetEmployees();

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
        <div>
          <label htmlFor="view">Select View:</label>
          <SelectButton
            id="view"
            value={view}
            onChange={e => setView(e.target.value)}>
            <option value="standard">Standard</option>
            <option value="minimal">Minimal</option>
          </SelectButton>
        </div>
      </HeaderEmployees>
      <ManageAccountContainer>
        {isGettingEmployees && <Spinner />}
        {employees?.length < 1 && (
          <Heading as="h3">There is no employee yet. </Heading>
        )}
        {!isGettingEmployees &&
          employees?.map(employee => (
            <EmployeeCard employee={employee} key={`employee-${employee.name}-${employee.id}`} view={view} />
          ))}
        <AddNewEmployeeButton view={view} />
      </ManageAccountContainer>
    </>
  );
}

export default Employees;
