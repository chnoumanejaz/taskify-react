import { useQuery } from '@tanstack/react-query';
import { getTasksById } from '../../services/apiTasks';
import { useParams } from 'react-router-dom';

export function useTask() {
  const { taskId } = useParams();

  const {
    isLoading,
    data: task,
    error,
  } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTasksById(taskId),
    retry: false,
  });
  return { isLoading, task, error };
}
