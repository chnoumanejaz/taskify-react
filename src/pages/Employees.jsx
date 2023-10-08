
import { useState } from 'react';
import BackButton from '../components/BackButton';
import EmployeesHeader from '../components/EmployeesHeader';
import ManageAccountBody from '../components/ManageAccountBody';
import { useGetEmployees } from '../features/employees/useGetEmployees';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

function Employees() {
  const [view, setView] = useLocalStorageState('standard', 'userViewType');
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoading: isGettingEmployees, employees } = useGetEmployees();

  return (
    <>
      <BackButton />
      <EmployeesHeader
        view={view}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        setView={setView}
        employees={employees}
      />
      <ManageAccountBody
        employees={employees}
        isGettingEmployees={isGettingEmployees}
        view={view}
        searchQuery={searchQuery}
      />
    </>
  );
}

export default Employees;
