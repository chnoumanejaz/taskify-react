import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import TaskDetailBody from '../components/TaskDetailBody';
import TaskDetailButtons from '../components/TaskDetailButtons';
import TaskDetailFooter from '../components/TaskDetailFooter';
import TaskDetailHeader from '../components/TaskDetailHeader';
import { useTask } from '../features/tasks/useTask';

function TaskDetail() {
  const { isLoading, task } = useTask();
  const navigate = useNavigate();

  if (isLoading) return <Spinner message="Getting Task details ..." />;

  return (
    <div>
      {task?.name ? (
        <>
          <BackButton />
          <TaskDetailHeader task={task} />
          <TaskDetailBody task={task} />
          <TaskDetailFooter task={task} />

          <TaskDetailButtons task={task} />
        </>
      ) : (
        navigate('/')
      )}
    </div>
  );
}

export default TaskDetail;
