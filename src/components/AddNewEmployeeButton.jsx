import styled, { css } from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import Modal from './Modal';
 import AddNewEmployeeForm from './AddNewEmployeeForm';

const Card = styled.div`
  background-color: var(--color-grey-100);
  padding: 4rem 5.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-0.5rem);
    box-shadow: var(--shadow-sm);
    & div {
      background-color: var(--color-primary-500);
      border: 2px solid var(--color-primary-200);
      & svg {
        transform: scale(1.3);
        color: var(--color-primary-100);
      }
    }
  }

  & div {
    padding: 2rem;
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
    & svg {
      width: 3rem;
      height: 3rem;
      color: var(--color-primary-500);
      transition: transform 0.2s;
    }
  }

  & p {
    font-size: 2rem;
    font-weight: 500;
  }

  ${props =>
    props.view === 'minimal' &&
    css`
      padding: 1rem 2rem;
      & div {
        padding: 1rem;
        width: 5rem;
        height: 5rem;
      }
    `}
`;

/* eslint-disable react/prop-types */
function AddNewEmployeeButton({ view }) {
  return (
    <Modal>
      <Modal.Open openName="add-new-employee">
        <Card view={view}>
          <div>
            <FaPlus />
          </div>
          <p>Add New</p>
        </Card>
      </Modal.Open>
      <Modal.Window name="add-new-employee">
        <AddNewEmployeeForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddNewEmployeeButton;
