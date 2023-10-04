import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createEditTasks } from '../../services/apiTasks';

export function useAddTask() {
  const queryClient = useQueryClient();

  const { mutate: addTask, isLoading } = useMutation({
    mutationFn: createEditTasks,
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });

      toast.success(
        `${data ? data.name : 'New '} task has been added successfully!`
      );
    },
    onError: err => toast.error(err.message),
  });

  return { addTask, isLoading };
}
