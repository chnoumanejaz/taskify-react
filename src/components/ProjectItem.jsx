import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import Modal from './Modal';
import { useDeleteProject } from '../features/projects/useDeleteProject';
import ConfirmDelete from './ConfirmDelete';
import AddProjectForm from './AddProjectForm';
import { formatDateTime } from '../utils/formatDateTime';

const StyledNavLink = styled(NavLink)`
  text-transform: none;
  font-size: 1.5rem;
  font-weight: 500;
  /* BUG: fix the focus on a project item as when there is a focus there is full black outline on everything */
  & li {
    padding: 1rem;
    background-color: var(--color-grey-100);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.5rem 0.5rem 0 0;
    border: 1px solid transparent;
    & .timeAgo {
      font-size: 1.2rem;
      font-family: 'Mooli';
    }
    & + .actions {
      background-color: var(--color-grey-200);
      display: flex;
      border-top: 1px solid var(--color-primary-500);
      justify-content: center;
      gap: 2rem;
      align-items: baseline;
      border-radius: 0 0 0.5rem 0.5rem;
      margin-bottom: 0.2rem;
      opacity: 0;
      max-height: 0;
      padding: 0;
      transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

      & div {
        width: 3rem;
        height: 3rem;
        display: grid;
        place-items: center;
        border-radius: 50%;
        border: 2px ridge transparent;
        cursor: pointer;
        & svg {
          width: 2rem;
          height: 2rem;
        }
      }
      & div:nth-child(1) {
        background-color: #fca5a5;
        & svg {
          color: var(--color-red-700);
        }
        &:hover {
          border: 2px ridge var(--color-red-700);
        }
      }

      & div:nth-child(2) {
        background-color: var(--color-primary-200);
        & svg {
          color: var(--color-primary-700);
        }
        &:hover {
          border: 2px ridge var(--color-primary-700);
        }
      }
    }
    & svg {
      min-width: 2rem;
      min-height: 2rem;
      color: var(--color-primary-700);
      opacity: 0;
      transform: translateX(-2rem);
      transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    & span {
      display: block;
      font-size: small;
      color: var(--color-primary-600);
    }
  }

  &:hover li {
    background-color: var(--color-grey-200);

    & .timeAgo {
      display: none;
    }
    & svg {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &.active li {
    background-color: var(--color-grey-200);
    & .timeAgo {
      display: none;
    }
    & + .actions {
      opacity: 1;
      padding: 0.5rem;
      max-height: fit-content;
    }
    & svg {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

/* eslint-disable react/prop-types */
function ProjectItem({ project }) {
  const navigate = useNavigate();
  const { isLoading: isDeleting, deleteProject } = useDeleteProject();
  return (
    <Modal>
      <StyledNavLink to={`/project/${project.id}`}>
        <li>
          <div>
            {project.name}
            <span>{'(' + project.category + ')'}</span>
          </div>
          <AiOutlineArrowRight />
          <span className="timeAgo">{formatDateTime(project.created_at)}</span>
        </li>
        <div className="actions">
          <Modal.Open openName="delete-project">
            <div>
              <MdOutlineDeleteOutline />
            </div>
          </Modal.Open>
          <Modal.Open openName="update-project">
            <div>
              <BiEdit />
            </div>
          </Modal.Open>
        </div>
      </StyledNavLink>

      <Modal.Window name="delete-project">
        <ConfirmDelete
          selected="project"
          resource={project.name}
          disabled={isDeleting}
          onConfirm={() => {
            deleteProject(project.id);
            navigate('/');
          }}
        />
      </Modal.Window>

      <Modal.Window name="update-project">
        <AddProjectForm projectToUpdate={project} />
      </Modal.Window>
    </Modal>
  );
}

export default ProjectItem;
