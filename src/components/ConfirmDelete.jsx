import styled from 'styled-components';
import Heading from './Heading';
import ButtonsContainer from './ButtonsContainer';
import Button from './Button';
import { PiWarningOctagonBold } from 'react-icons/pi';
import SpinnerMini from './SpinnerMini';

const ConfirmDeleteContainer = styled.div`
  margin-top: 2rem;

  & h2 {
    font-size: 1.8rem;
  }
`;

const MessageContainer = styled.div`
  border-top: 1px solid var(--color-grey-200);
  border-bottom: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-100);
  padding: 2rem 0;
  border-radius: 0.5rem;
  margin: 2rem 0;
`;

const Message = styled.div`
  margin: 0 2rem;
  padding: 1.5rem 2rem;
  background-color: #fca5a5;
  font-weight: 500;
  border-radius: 0.5rem;
  border: 1px solid var(--color-red-800);
  display: flex;
  gap: 2rem;
  align-items: center;
  font-size: 1.4rem;
  color: var(--color-grey-50);
  & svg {
    color: var(--color-red-800);
    width: 2rem;
    height: 2rem;
  }

  & div p {
    color: var(--color-red-800);
  }
`;

/* eslint-disable react/prop-types */
function ConfirmDelete({
  selected,
  resource,
  disabled,
  onConfirm,
  onCloseModal,
}) {
  return (
    <ConfirmDeleteContainer>
      <Heading as="h2">
        Confirm deletion of {selected} {resource}
      </Heading>
      <MessageContainer>
        <Message>
          <PiWarningOctagonBold />
          <div>
            This action cannot be undone.
            <p>Are you sure you want to delete the selected {selected}?</p>
          </div>
        </Message>
      </MessageContainer>
      <ButtonsContainer side="right">
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={() => onCloseModal?.()}>
          Cancle
        </Button>
        <Button
          variation="danger"
          disabled={disabled}
          iconStart={disabled && <SpinnerMini />}
          onClick={onConfirm}>
          {disabled ? 'Deleting ...' : 'Confirm Delete'}
        </Button>
      </ButtonsContainer>
    </ConfirmDeleteContainer>
  );
}

export default ConfirmDelete;
