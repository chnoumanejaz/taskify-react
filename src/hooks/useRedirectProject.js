import { useNavigate, useParams } from 'react-router-dom';
import useGetProjects from '../features/projects/useGetProjects';

export default function useRedirectProject() {
  const { projectId } = useParams();
  const { projects } = useGetProjects();
  const navigate = useNavigate();
  let notEqual = 0;
  if (projects?.length) {
    projects.map(project => {
      if (project.id != projectId) {
        notEqual++;
      }
    });
  }
  if (notEqual === projects?.length) {
    navigate('/');
  }
}
