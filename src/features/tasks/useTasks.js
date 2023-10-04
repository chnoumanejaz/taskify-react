import { useQuery } from '@tanstack/react-query';
import { getTasksByProject } from '../../services/apiTasks';
import { useParams } from 'react-router-dom';

export default function useTasks() {
  const { projectId } = useParams();

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => getTasksByProject(projectId),
  });

  return { tasks, isLoading, error };
}



