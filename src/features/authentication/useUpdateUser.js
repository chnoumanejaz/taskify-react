import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';
import { toast } from 'react-toastify';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: ({ password, fullname, avatar }) =>
      updateCurrentUser({ password, fullname, avatar }),
    onSuccess: ( ) => {
       queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Account updated successfully', {
        autoClose: 1000,
      });
    },

    onError: err =>
      toast.error(err.message, {
        autoClose: 5000,
      }),
  });

  return { isLoading, updateUser };
}
