import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import Spinner from '../components/Spinner';
import WelcomeScreen from '../components/WelcomeScreen';
import useTasks from '../features/tasks/useTasks';

import TableBody from '../components/TableBody';
import TableHeader from '../components/TableHeader';
import TasksHeader from '../components/TasksHeader';
import useGetProjects from '../features/projects/useGetProjects';
import useRedirectProject from '../hooks/useRedirectProject';

const TasksContiner = styled.div`
  padding: 0 1rem;
`;

// BUG: reset the search query to = '' on everywhere
function ProjectDetail() {
  useRedirectProject();
  const { projectId } = useParams();
  const { projects } = useGetProjects();
  const { isLoading: isGettingTasks, tasks } = useTasks();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotReversed = tasks?.filter(task => {
    return (
      task.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      task.domain.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
  });
  // For the new one on the top not at end
  let filteredTasks = filteredNotReversed?.toReversed();

  let status = searchParams.get('status');
  const statusFilter = tasks?.filter(task => task.status === status);
  if (status === 'all' || !status || searchQuery) {
    filteredTasks = filteredNotReversed;
    status = 'all';
  } else filteredTasks = statusFilter;

  // Other all
  if (isGettingTasks) return <Spinner message="Getting tasks ..." />;

  if (!tasks?.length)
    return (
      <WelcomeScreen
        name="task"
        projectName={projects.map(project => {
          return project.id == projectId ? project.name : ' ';
        })}
      />
    );

  return (
    <TasksContiner>
      <TasksHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        status={status}
        tasks={tasks}
      />
      <div>
        <TableHeader />
        <TableBody filteredTasks={filteredTasks} searchQuery={searchQuery} />
      </div>
    </TasksContiner>
  );
}

export default ProjectDetail;
