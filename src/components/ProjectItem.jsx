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
import { handleTheLongData } from '../utils/handleTheData';
import CustomTooltip from './CustomTooltip';

const StyledNavLink = styled(NavLink)`
  text-transform: none;
  font-size: 1.5rem;
  font-weight: 500;

  & .item {
    padding: 1.5rem 1rem 1rem 1rem;
    background-color: var(--color-grey-100);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.5rem 0.5rem 0 0;
    border: 1px solid transparent;
    margin-top: 0.2rem;
    position: relative;

    & .timeAgo {
      font-size: 1.1rem;
      font-family: 'Mooli';
      white-space: nowrap;
      position: absolute;
      right: 0.2rem;
      top: -0.5rem;
      color: var(--color-primary-50);
      background-color: var(--color-primary-500);
      padding: 0.2rem 0.5rem;
      border-radius: 0.5rem;
      transition: all 0.2s;
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
      display: none;
      padding: 0.4rem;

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
      & .del {
        background-color: #fca5a5;
        & svg {
          color: var(--color-red-700);
        }
        &:hover {
          border: 2px ridge var(--color-red-700);
        }
      }

      & .edit {
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

  &:hover .item {
    background-color: var(--color-grey-200);

    & .timeAgo {
      transform: translateX(0.5rem) translateY(-0.5rem);
    }
    & svg {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &.active .item {
    background-color: var(--color-grey-200);
    & .timeAgo {
      transform: translateX(0.1rem) translateY(-0.2rem);
    }
    & + .actions {
      display: flex;
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
        <li className="item">
          <span className="timeAgo">{formatDateTime(project.created_at)}</span>
          <div>
            {handleTheLongData(project.name)}
            <span>{'(' + handleTheLongData(project.category) + ')'}</span>
          </div>
          <AiOutlineArrowRight />
        </li>
        <div className="actions">
          <CustomTooltip title="Delete Project">
            <Modal.Open openName="delete-project">
              <div className="del">
                <MdOutlineDeleteOutline />
              </div>
            </Modal.Open>
          </CustomTooltip>

          <CustomTooltip title="Update Project">
            <Modal.Open openName="update-project">
              <div className="edit">
                <BiEdit />
              </div>
            </Modal.Open>
          </CustomTooltip>
        </div>
      </StyledNavLink>

      <Modal.Window name="delete-project">
        <ConfirmDelete
          selected="project"
          resource={project.name}
          disabled={isDeleting}
          onConfirm={() => {
            deleteProject(project.id, {
              onSuccess: () => navigate(-1),
            });
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
