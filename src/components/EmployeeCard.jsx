import styled, { css } from 'styled-components';
import { MdDeleteOutline } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import Modal from './Modal';
import ConfirmDelete from './ConfirmDelete';
import { useDeleteEmployee } from '../features/employees/useDeleteEmployee';
import AddNewEmployeeForm from './AddNewEmployeeForm';
import { handleTheShortData } from '../utils/handleTheData';

const Card = styled.div`
  background-color: var(--color-grey-100);
  padding: 3rem 3rem 1.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s;

  &:hover {
    box-shadow: var(--shadow-sm);
    & img {
      transform: scale(1.1);
    }
  }
  & .image {
    width: 10rem;
    height: 10rem;
    background-color: var(--color-grey-50);
    border: 2px solid var(--color-primary-500);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    overflow: hidden;
    & img {
      width: 100%;
      object-fit: cover;
      transition: transform 0.2s;
    }
  }

  & p {
    font-size: 1.6rem;
    font-weight: 500;
    text-align: center;
    & span {
      display: block;
      font-size: 1.3rem;
      color: var(--color-grey-500);
    }
  }

  ${props =>
    props.view === 'minimal' &&
    css`
      padding: 1.5rem 3rem 1rem;
      flex-direction: row;

      gap: 1rem;
      & .image {
        min-width: 7rem;
        max-width: 7rem;
        min-height: 7rem;
        max-height: 7rem;
      }
    `}
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 7.8rem;

  & div {
    width: 4rem;
    height: 4rem;
    cursor: pointer;
    border-color: transparent;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid transparent;

    & svg {
      width: 2rem;
      height: 2rem;
    }
  }

  & div:nth-child(1) {
    color: var(--color-red-700);
    background-color: #fca5a5;
    &:hover {
      border-color: var(--color-red-700);
    }
  }

  & div:nth-child(2) {
    color: var(--color-primary-700);
    background-color: var(--color-primary-200);
    &:hover {
      border-color: var(--color-primary-700);
    }
  }

  ${props =>
    props.view === 'minimal' &&
    css`
      gap: 0.5rem;
      flex-direction: column;
      & div:nth-child(2) {
        background-color: inherit;
      }

      & .svg-container {
        all: unset;
        display: flex;
        justify-content: center;
        gap: 1rem;
        width: 100%;

        & .edit-svg {
          background-color: var(--color-primary-200);
        }

        & div {
          width: 3rem;
          height: 3rem;
          & svg {
            width: 2rem;
            height: 2rem;
          }
        }
      }
    `}
`;

/* eslint-disable react/prop-types */
function EmployeeCard({ employee, view }) {
  const { isLoading: isDeleting, deleteEmployee } = useDeleteEmployee();

  return (
    <Modal>
      <Card view={view}>
        <div className="image">
          <img
            src={
              employee.avatarUrl
                ? employee.avatarUrl
                : 'https://ih1.redbubble.net/image.485923661.1240/st,small,507x507-pad,600x600,f8f8f8.u1.jpg'
            }
            alt={`image-of-${employee.name}`}
          />
        </div>
        {view === 'standard' && (
          <p>
            {handleTheShortData(employee.name)}
            <span>{employee.phone}</span>
          </p>
        )}
        <CardFooter view={view}>
          {view === 'minimal' && (
            <p>
              {handleTheShortData(employee.name)}
              <span>{employee.phone}</span>
            </p>
          )}
          {view === 'standard' && (
            <>
              <Modal.Open openName="delete-standard">
                <div>
                  <MdDeleteOutline />
                </div>
              </Modal.Open>
              <Modal.Open openName="update-standard">
                <div>
                  <BiEdit />
                </div>
              </Modal.Open>
            </>
          )}
          {view === 'minimal' && (
            <div className="svg-container">
              <Modal.Open openName="delete-minimal">
                <div>
                  <MdDeleteOutline />
                </div>
              </Modal.Open>
              <Modal.Open openName="update-minimal">
                <div className="edit-svg">
                  <BiEdit />
                </div>
              </Modal.Open>
            </div>
          )}

          <Modal.Window name="delete-minimal">
            <ConfirmDelete
              selected="employee"
              resource={employee.name}
              disabled={isDeleting}
              onConfirm={() => deleteEmployee(employee.id)}
            />
          </Modal.Window>

          <Modal.Window name="delete-standard">
            <ConfirmDelete
              selected="employee"
              resource={employee.name}
              disabled={isDeleting}
              onConfirm={() => deleteEmployee(employee.id)}
            />
          </Modal.Window>

          <Modal.Window name="update-minimal">
            <AddNewEmployeeForm employeeToUpdate={employee} />
          </Modal.Window>

          <Modal.Window name="update-standard">
            <AddNewEmployeeForm employeeToUpdate={employee} />
          </Modal.Window>
        </CardFooter>
      </Card>
    </Modal>
  );
}

export default EmployeeCard;
