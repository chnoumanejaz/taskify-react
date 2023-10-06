import { BsFillEyeFill } from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDeleteTask } from '../features/tasks/useDeleteTask';
import { calculateTimeDifference } from '../utils/calculateTimeDifference';
import Button from './Button';
import ButtonsContainer from './ButtonsContainer';
import ConfirmDelete from './ConfirmDelete';
import ErrorMessage from './ErrorMessage';
import Input from './Input';
import Modal from './Modal';
import TableRow from './TableRow';
import priorities from '../data/priorities';

const StyledTableBody = styled.div`
  background-color: var(--color-grey-50);
  font-weight: 500;
`;

/* eslint-disable react/prop-types */
function TableBody({ filteredTasks, searchQuery }) {
  const navigate = useNavigate();

  const { deleteTask, isLoading: isDeleting } = useDeleteTask();

  return (
    <StyledTableBody>
      {filteredTasks?.length ? (
        filteredTasks.map(task => (
          <TableRow
            key={task.id + task.detail.slice(0, 5)}
            status={task.status === 'complete'}>
            <Modal>
              <Input
                type="checkbox"
                defaultChecked={task.status === 'complete'}
              />
              <p
                className="priority"
                style={{ color: priorities[task.priority].color }}>
                {priorities[task.priority].symbol}
              </p>
              <p>{task.name}</p>
              <p>{task.domain}</p>
              <p>{calculateTimeDifference(task.dueDate)}</p>
              <img src={task.employees?.avatarUrl} alt={task.employees?.name} />
              <ButtonsContainer>
                <Modal.Open openName="delete-task">
                  <Button size="small">
                    <MdDeleteOutline />
                  </Button>
                </Modal.Open>

                <Button
                  size="small"
                  onClick={() => navigate(`/task/${task.id}`)}>
                  <BsFillEyeFill />
                </Button>
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
