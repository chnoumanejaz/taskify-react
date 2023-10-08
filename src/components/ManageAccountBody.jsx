import styled from 'styled-components';
import Heading from './Heading';
import EmployeeCard from './EmployeeCard';
import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner';
import AddNewEmployeeButton from './AddNewEmployeeButton';

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

/* eslint-disable react/prop-types */
function ManageAccountBody({
  employees,
  isGettingEmployees,
  view,
  searchQuery,
}) {
  const filteredData = employees?.filter(employee => {
    return (
      employee.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      employee.phone.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
  });

  return (
    <ManageAccountContainer>
      {employees?.length < 1 && (
        <Heading as="h3">There is no employee yet. </Heading>
      )}

      {isGettingEmployees ? (
        <Spinner message="Getting your employees ..." />
      ) : (
        <AddNewEmployeeButton view={view} />
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
    </ManageAccountContainer>
  );
}

export default ManageAccountBody;
