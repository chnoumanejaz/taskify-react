import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success('Logged Out successfully', {
        autoClose: 1000
      });
      navigate('/login', { replace: true });
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return { logout, isLoading };
}
