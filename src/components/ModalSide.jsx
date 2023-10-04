import styled from 'styled-components';
import { FaAngleDoubleRight } from 'react-icons/fa';
import formatDate from '../utils/formatDate';
import { cloneElement, createContext, useContext, useState } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

const ModalSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  inset: 0;
  left: 30%;
  background-color: var(--color-grey-100);
  box-shadow: var(--shadow-md);
  z-index: 10;
  /* text-align: left; */
`;

const FormHeader = styled.div`
  padding: 1rem;
  background-color: var(--color-grey-50);
  display: flex;
  /* justify-content: center; */
  justify-content: space-between;
  align-items: center;

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    cursor: pointer;
    color: var(--color-primary-600);
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    &:hover {
      transform: translateX(0.5rem) scale(1.1);
    }
  }
`;

const Details = styled.div`
  color: var(--color-primary-600);
  color: var(--color-primary-600);
  font-weight: 500;
  font-size: 1.5rem;
  & span {
    color: var(--color-primary-800);
    font-weight: 600;
  }
`;

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
    },
  },
  closed: {
    x: '100%',
    opacity: 0,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
    },
  },
};

const ModalSideContext = createContext();

/* eslint-disable react/prop-types */
function ModalSide({ children }) {
  const [openName, setOpenName] = useState('');

  function close() {
    setOpenName('');
  }
  function open(openModalName) {
    setOpenName(openModalName);
  }

  return (
    <ModalSideContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalSideContext.Provider>
  );
}

function Open({ children, openName }) {
  const { open } = useContext(ModalSideContext);

  return cloneElement(children, { onClick: () => open(openName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalSideContext);

  const ref = useOutsideClick(close);
  if (name !== openName) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial="closed"
        animate="open"
        exit="closed"
        onEnded="closed"
        variants={variants}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100vh',
          zIndex: '10',
        }}>
        <ModalSideContainer ref={ref}>
          <FormHeader>
            <FaAngleDoubleRight onClick={close} />
            <Details>
              <span>Date:</span> {formatDate(new Date())}
            </Details>
          </FormHeader>
          {cloneElement(children, { onCloseModalSide: close })}
        </ModalSideContainer>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

ModalSide.Open = Open;
ModalSide.Window = Window;

export default ModalSide;
