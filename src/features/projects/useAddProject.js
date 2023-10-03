import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditProject } from '../../services/apiProjects';
import { toast } from 'react-toastify';

export function useAddProject() {
  const queryClient = useQueryClient();

  const { mutate: createProject, isLoading } = useMutation({
    mutationFn: createEditProject,
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });

      toast.success(
        `${data ? data.name : 'New '} project has been created successfully!`
      );
    },
    onError: err => toast.error(err.message),
  });

  return { createProject, isLoading };
}
