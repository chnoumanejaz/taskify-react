import { useQuery } from '@tanstack/react-query';
import { getEmployees } from '../../services/apiEmployees';

// const {user} = useGetUser()
export function useGetEmployees() {
  const {
    data: employees,
    isLoading,
    error,
  } = useQuery({
    queryFn: getEmployees,
    queryKey: ['employees'],
  });

  return { isLoading, employees, error };
}
