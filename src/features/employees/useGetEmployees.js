import { useQuery } from '@tanstack/react-query';
import { getEmployees } from '../../services/apiEmployees';

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
