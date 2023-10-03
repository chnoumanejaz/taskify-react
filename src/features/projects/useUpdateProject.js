import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditProject } from '../../services/apiProjects';
import { toast } from 'react-toastify';

export default function useUpdateProject() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateProject } = useMutation({
    mutationFn: ({ newProjectData, id }) =>
      createEditProject(newProjectData, id),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });
      toast.success(`Project (${data.name}) updated Successfully!`, {
        autoClose: 2000,
      });
    },
    onError: err => toast.error(err.message),
  });

  return { updateProject, isLoading };
}
