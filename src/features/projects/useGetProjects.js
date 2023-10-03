import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../../services/apiProjects';

export default function useGetProjects() {
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryFn: getProjects,
    queryKey: ['projects'],
  });

  return { isLoading, projects, error };
}
