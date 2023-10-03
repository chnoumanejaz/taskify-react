import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditEmployee } from '../../services/apiEmployees';
import { toast } from 'react-toastify';

export function useUpdateEmployee() {
  const queryClient = useQueryClient();
  const { mutate: updateEmployee, isLoading } = useMutation({
    mutationFn: ({ newEmployeeData, id }) =>
      createEditEmployee(newEmployeeData, id),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success(data.name + ' updated successfully!');
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return { isLoading, updateEmployee };
}
