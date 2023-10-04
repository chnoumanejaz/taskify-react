import useTasks from '../features/tasks/useTasks';
import Spinner from '../components/Spinner';
import WelcomeScreen from '../components/WelcomeScreen';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useGetProjects from '../features/projects/useGetProjects';
import styled from 'styled-components';
import Heading from '../components/Heading';
import Button from '../components/Button';
import Input from '../components/Input';
import { HiPlus } from 'react-icons/hi';
import { useState } from 'react';
import { InputContainer } from './Employees';
import { BiSearchAlt } from 'react-icons/bi';
import ModalSide from '../components/ModalSide';
import AddNewTaskForm from '../components/AddNewTaskForm';
import { calculateTimeDifference } from '../utils/calculateTimeDifference';
import ErrorMessage from '../components/ErrorMessage';
import ButtonsContainer from '../components/ButtonsContainer';
import { MdDeleteOutline } from 'react-icons/md';
import { LuExpand } from 'react-icons/lu';
import Modal from '../components/Modal';
import ConfirmDelete from '../components/ConfirmDelete';

const TasksContiner = styled.div`
  padding: 0 1rem;
`;
const TasksHeader = styled.div`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const HeaderButtonsContainer = styled.div`
  background-color: var(--color-grey-100);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  & button {
    border: none;
    outline: none;
    padding: 0.4rem 0.7rem;
    border-radius: 0.5rem;
    font-weight: 500;
    background-color: var(--color-grey-100);
    transition: all 0.3s;
    &:focus {
      outline: 2px solid var(--color-primary-500);
      background-color: var(--color-primary-600);
      color: var(--color-primary-50);
    }
    &:hover {
      background-color: var(--color-primary-600);
      color: var(--color-primary-50);
    }
  }
`;

const TasksTable = styled.div``;
const TableHeader = styled.div`
  background-color: var(--color-grey-100);
  padding: 1rem 0;
  border-radius: 0.5rem 0.5rem 0 0;
  display: grid;
  // checkbox, priority, name, domain, date, assigned to, details btn
  grid-template-columns: 2rem 6rem 32rem 20rem 15rem 10rem 8rem;
  column-gap: 1rem;
  align-items: center;

  & h3 {
    font-size: 1.8rem;
  }
`;
const TableBody = styled.div`
  background-color: var(--color-grey-50);
  font-weight: 500;
`;
const TableRow = styled.div`
  display: grid;
  // checkbox, priority, name, domain, date, assigned to, details btn
  grid-template-columns: 2rem 6rem 32rem 20rem 15rem 10rem 8rem;
  column-gap: 1rem;
  align-items: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  & input {
    accent-color: var(--color-primary-500);
    width: 1.7rem;
    height: 1.7rem;
    cursor: pointer;
    &:focus {
      outline-offset: 0.1rem;
    }
    &:hover,
    &:checked {
      outline: 2px solid var(--color-primary-500);
      outline-offset: 0.1rem;
    }
  }

  & img {
    max-width: 4rem;
    min-width: 4rem;
    max-height: 4rem;
    min-height: 4rem;
    border-radius: 50%;
    margin: 0 auto;
  }
`;

function ProjectDetail() {
  // This needs to be here because when someone else direct hit the url with the other user project id then he get the result nothing but he has that url to add new task which is useless
  // so by this logic if the project tasks that is not created by that user then he automatically redirects to the homepage
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
  if (notEqual === projects?.length) navigate('/');

  //  rest of the logic to show and wok with the tasks if he owns that project
  const { isLoading: isGettingTasks, tasks } = useTasks();
  // BUG: reset the search query to = '' on everywhere
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks?.filter(task => {
    return (
      task.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      task.domain.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
  });

  // Other all
  if (isGettingTasks) return <Spinner message="Getting tasks ..." />;

  if (!tasks?.length) return <WelcomeScreen name="task" />;

  return (
    <TasksContiner>
      <TasksHeader>
        <Heading as="h1">All Tasks</Heading>

        <HeaderActions>
          <HeaderButtonsContainer>
            <button>
              All {tasks?.length < 9 ? '0' + tasks.length : tasks.length}
            </button>
            <button>Completed Y</button>
            <button>Due Z</button>
          </HeaderButtonsContainer>
          <InputContainer>
            <Input
              type="text"
              placeholder="Search by name, domain"
              forr="mainPage"
              maxLength={100}
              style={{ padding: '1rem 1.5rem 1rem 4rem' }}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <BiSearchAlt style={{ top: '1.05rem' }} />
          </InputContainer>
        </HeaderActions>
        <div>
          <ModalSide>
            <ModalSide.Open openName="add-newTask">
              <Button iconStart={<HiPlus />}>Add New</Button>
            </ModalSide.Open>
            <ModalSide.Window name="add-newTask">
              <AddNewTaskForm />
            </ModalSide.Window>
          </ModalSide>
        </div>
      </TasksHeader>

      <TasksTable>
        <TableHeader>
          {/* checkbox, priority, name, domain, date, assigned to, details btn */}
          <div></div>
          <div></div>
          <Heading as="h3">Name</Heading>
          <Heading as="h3">Domain</Heading>
          <Heading as="h3">Due Date</Heading>
          <Heading as="h3">Assigned</Heading>
          <div></div>
        </TableHeader>
        <TableBody>
          {filteredTasks?.length ? (
            filteredTasks.map(task => (
              <TableRow key={task.id + task.detail.slice(0, 5)}>
                <Modal>
                  <Input type="checkbox" />
                  <p>{task.priority}</p>
                  <div>{task.name}</div>
                  <p>{task.domain}</p>
                  <p>{calculateTimeDifference(task.dueDate)}</p>
                  <img
                    src={task.employees?.avatarUrl}
                    alt={task.employees?.name}
                  />
                  <ButtonsContainer>
                    <Modal.Open openName="delete-task">
                      <Button size="small">
                        <MdDeleteOutline />
                      </Button>
                    </Modal.Open>
                    <Button size="small">
                      <LuExpand />{' '}
                    </Button>
                  </ButtonsContainer>
                  <Modal.Window name="delete-task">
                    <ConfirmDelete selected="task" resource={task.name} />
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
        </TableBody>
      </TasksTable>
    </TasksContiner>
  );
}

export default ProjectDetail;
