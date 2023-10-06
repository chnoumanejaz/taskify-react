import styled from 'styled-components';
import Spinner from '../components/Spinner';
import { useTask } from '../features/tasks/useTask';
import BackButton from '../components/BackButton';
import TaskDetailHeader from '../components/TaskDetailHeader';
import TaskDetailBody from '../components/TaskDetailBody';
import TaskDetailFooter from '../components/TaskDetailFooter';
import TaskDetailButtons from '../components/TaskDetailButtons';

const TaskContainer = styled.div``;

function TaskDetail() {
  const { isLoading, task } = useTask();
  if (isLoading) return <Spinner message="Getting Task details ..." />;

  return (
    <TaskContainer>
      <BackButton />
      <TaskDetailHeader task={task} />
      <TaskDetailBody task={task} />
      <TaskDetailFooter task={task} />

      <TaskDetailButtons task={task}/>
    </TaskContainer>
  );
}

export default TaskDetail;
