import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      toast.success('Logged In Successfully', {
        autoClose: 1000
      });
      queryClient.setQueryData(['user'], user.user);
      navigate('/');
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return { login, isLoading };
}
