import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function useSignup() {
  const navigate = useNavigate();

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: ({ fullname, email, password }) =>
      signupApi({ fullname, email, password }),

    onSuccess: () => {
      toast.success(
        'Account created successfully! Check your email for verification',
        {
          autoClose: 5000,
        }
      );
      navigate('/login');
    },
    onError: err => toast.error(err.message),
  });

  return { signUp, isLoading };
}
