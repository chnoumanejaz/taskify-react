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

    onError: err => toast.error(err.message),
  });

  return { isLoading, deleteEmployee };
}
