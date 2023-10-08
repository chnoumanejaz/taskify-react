import { useEffect, useState } from 'react';
import { BsFillEyeFill } from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import priorities from '../data/priorities';
import { useDeleteTask } from '../features/tasks/useDeleteTask';
import { useUpdateSingleTask } from '../features/tasks/useUpdateSingleTask';
import { calculateTimeDifference } from '../utils/calculateTimeDifference';
import { handleTheShortData } from '../utils/handleTheData';
import Button from './Button';
import ButtonsContainer from './ButtonsContainer';
import ConfirmDelete from './ConfirmDelete';
import CustomTooltip from './CustomTooltip';
import ErrorMessage from './ErrorMessage';
import Input from './Input';
import Modal from './Modal';
import TableRow from './TableRow';

const StyledTableBody = styled.div`
  background-color: var(--color-grey-50);
  font-weight: 500;
`;

/* eslint-disable react/prop-types */
function TableBody({ filteredTasks, searchQuery }) {
  const navigate = useNavigate();

  const { deleteTask, isLoading: isDeleting } = useDeleteTask();
  const [doneStatus, setDoneStatus] = useState(false);
  const [id, setId] = useState('');
  const { updateTask, isLoading: isUpdating } = useUpdateSingleTask();

  useEffect(() => {
    updateTask({
      doneStatus,
      id: id,
    });
  }, [doneStatus, updateTask, id]);

  return (
    <StyledTableBody>
      {filteredTasks?.length ? (
        filteredTasks.map(task => (
          <TableRow
            key={task.id + task.detail.slice(0, 5)}
            status={task.status === 'complete'}>
            <Modal>
              <CustomTooltip
                title={`Mark as ${
                  task.status === 'complete' ? 'due' : 'complete'
                }`}>
                <Input
                  type="checkbox"
                  disabled={isUpdating}
                  onClick={e => {
                    setId(task.id);
                    setDoneStatus(e.target.checked);
                  }}
                  defaultChecked={task.status === 'complete'}
                />
              </CustomTooltip>
              <CustomTooltip title={task.priority + ' Priority'}>
                <p
                  className="priority"
                  style={{ color: priorities[task.priority].color }}>
                  {priorities[task.priority].symbol}
                </p>
              </CustomTooltip>
              <p>{handleTheShortData(task.name)}</p>
              <p>{handleTheShortData(task.domain)}</p>
              <p>{calculateTimeDifference(task.dueDate)}</p>
              <CustomTooltip title={task.employees?.name}>
                <img
                  src={task.employees?.avatarUrl}
                  alt={task.employees?.name}
                />
              </CustomTooltip>
              <ButtonsContainer>
                <CustomTooltip title="Delete">
                  <Modal.Open openName="delete-task">
                    <Button size="small" variation="danger">
                      <MdDeleteOutline />
                    </Button>
                  </Modal.Open>
                </CustomTooltip>

                <CustomTooltip title="View">
                  <Button
                    size="small"
                    onClick={() => navigate(`/task/${task.id}`)}>
                    <BsFillEyeFill />
                  </Button>
                </CustomTooltip>
              </ButtonsContainer>

              <Modal.Window name="delete-task">
                <ConfirmDelete
                  selected="task"
                  resource={task.name}
                  disabled={isDeleting}
                  onConfirm={() => deleteTask(task.id)}
                />
              </Modal.Window>
            </Modal>
          </TableRow>
        ))
      ) : (
        <ErrorMessage
          message="No task found for this query"
          query={searchQuery}
        />
      )}
    </StyledTableBody>
  );
}

export default TableBody;
