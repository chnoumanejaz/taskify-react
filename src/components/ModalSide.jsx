import { AnimatePresence, motion } from 'framer-motion';
import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaAngleDoubleRight } from 'react-icons/fa';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';
import formatDate from '../utils/formatDate';
import Heading from './Heading';

const OverlayModalSide = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(1.5px);
  z-index: 30;
  transition: all 0.3s;
`;

const ModalSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 0;
  left: 23%;
  background-color: var(--color-grey-100);
  z-index: 10;
  border-left: 10px solid var(--color-grey-300);
`;

const FormHeader = styled.div`
  padding: 1rem;
  background-color: var(--color-grey-50);
  display: flex;
  /* justify-content: center; */
  justify-content: space-between;
  align-items: center;
  & div {
    display: flex;
    align-items: center;
    gap: 2rem;
    color: var(--color-primary-600);
    & h3 {
      font-size: 1.6rem;
      font-weight: 600;
    }
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    cursor: pointer;
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

function Window({ children, name, heading }) {
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
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          overflowY: 'scroll',
          width: '100%',
          height: '100vh',
          zIndex: '10',
        }}>
        <OverlayModalSide>
          <ModalSideContainer ref={ref}>
            <FormHeader>
              <div>
                <FaAngleDoubleRight onClick={close} />
                <Heading as="h3">{heading}</Heading>
              </div>
              <Details>
                <span>Date:</span> {formatDate(new Date())}
              </Details>
            </FormHeader>
            {cloneElement(children, { onCloseModalSide: close })}
          </ModalSideContainer>
        </OverlayModalSide>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

ModalSide.Open = Open;
ModalSide.Window = Window;

export default ModalSide;
