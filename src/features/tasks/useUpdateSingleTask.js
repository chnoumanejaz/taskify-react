import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateSingleColumn } from '../../services/apiTasks';

export function useUpdateSingleTask() {
  const queryClient = useQueryClient();

  const { mutate: updateTask, isLoading } = useMutation({
    mutationFn: ({ id, doneStatus }) => updateSingleColumn(id, doneStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task updated successfully!', {
        autoClose: 1000
      });
    },
    onError: err => {
      console.log(err.message);
    },
  });

  return { isLoading, updateTask };
}
