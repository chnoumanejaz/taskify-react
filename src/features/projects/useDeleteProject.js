import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-toastify';
import { deleteProject as deleteProjectApi } from '../../services/apiProjects';

export function useDeleteProject() {
  const queryClient = useQueryClient();

  const { mutate: deleteProject, isLoading } = useMutation({
    mutationFn: deleteProjectApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });
      toast.success('Project has been Deleted Successfully!', {
        autoClose: 1000,
      });
    },

    onError: err => toast.error(err.message),
  });

  return { isLoading, deleteProject };
}
