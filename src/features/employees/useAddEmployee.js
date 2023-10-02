import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditEmployee } from '../../services/apiEmployees';
import { toast } from 'react-toastify';

export default function useAddEmployee() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: addEmployee } = useMutation({
    mutationFn: createEditEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success('New employee added successfully!', {
        autoClose: 2000,
      });
    },
    onError: err => toast.error(err.message),
  });

  return { isLoading, addEmployee };
}
