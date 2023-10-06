import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEmployee as deleteEmployeeApi } from '../../services/apiEmployees';
import { toast } from 'react-toastify';

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  const { mutate: deleteEmployee, isLoading } = useMutation({
    mutationFn: deleteEmployeeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['employees'],
      });
      toast.success('Employee Deleted Successfully!', {
        autoClose: 1000,
      });
    },

    onError: () =>
      toast.error(
        'Unable to delete this employee. Please make sure this employee dont have any task assigned.',
        {
          autoClose: 5000,
        }
      ),
  });

  return { isLoading, deleteEmployee };
}
