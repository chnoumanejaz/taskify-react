import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteTask as deleteTaskApi } from '../../services/apiTasks';

export function useDeleteTask() {
  const queryClient = useQueryClient();

  const { mutate: deleteTask, isLoading } = useMutation({
    mutationFn: deleteTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
      toast.success('Task Deleted Successfully!', {
        autoClose: 1000,
      });
    },

    onError: err => toast.error(err.message),
  });

  return { isLoading, deleteTask };
}
