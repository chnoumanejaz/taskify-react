import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../services/apiAuth';

export default function useGetUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  return { isLoading, user, isAuthenticated: user?.role === 'authenticated' };
}
