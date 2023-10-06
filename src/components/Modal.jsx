import { cloneElement, createContext, useContext, useState } from 'react';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { createPortal } from 'react-dom';
import { GrFormClose } from 'react-icons/gr';
import { AnimatePresence, motion } from 'framer-motion';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: 0.7rem;
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 30;
  transition: all 0.5s;
`;

const Button = styled.button`
  background-color: var(--color-primary-50);
  border: 1px solid transparent;
  border-radius: 0.5rem;
  transform: translateX(0.8rem);
  transition: all 0.1s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-primary-500);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;

    color: var(--color-grey-500);
  }
`;

const containerVariants = {
  open: {
    y: 320,
    opacity: 1,
    transition: {
      y: { type: 'spring', stiffness: 800, damping: 50 },
      opacity: { duration: 0.4 },
    },
  },
  closed: {
    y: '100%',
    opacity: 0,
    transition: {
      y: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.5 },
    },
  },
};

const ModalContext = createContext();

/* eslint-disable react/prop-types */
function Modal({ children }) {
  const [openName, setOpenName] = useState('');

  function close() {
    setOpenName('');
  }
  function open(openModalName) {
    setOpenName(openModalName);
  }

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, openName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(openName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <AnimatePresence>
        <motion.div
          variants={containerVariants}
          initial="closed"
          animate="open"
          exit="closed">
          <StyledModal ref={ref}>
            <Button onClick={close}>
              <GrFormClose />
            </Button>
            <div>{cloneElement(children, { onCloseModal: close })}</div>
          </StyledModal>
        </motion.div>
      </AnimatePresence>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
