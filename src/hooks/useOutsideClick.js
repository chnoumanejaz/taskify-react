import { useEffect, useRef } from 'react';

export function useOutsideClick(handler, isCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener('click', handleClick, isCapturing);

    return () =>
      document.removeEventListener('click', handleClick, isCapturing);
  }, [handler, isCapturing]);

  return ref;
}