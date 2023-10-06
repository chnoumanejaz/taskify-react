import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createEditTasks } from '../../services/apiTasks';
import { useParams } from 'react-router-dom';

export function useUpdateTask() {
  const queryClient = useQueryClient();
  const { taskId } = useParams();
  const { mutate: updateTask, isLoading } = useMutation({
    mutationFn: ({ newTaskData, id }) => createEditTasks(newTaskData, id),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', taskId] });
      toast.success(data.name + ' task updated successfully!');
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return { isLoading, updateTask };
}
