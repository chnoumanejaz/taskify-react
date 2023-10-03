import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

/* eslint-disable react/prop-types */
function DarkModeProvider({ children }) {
  const userSystemTheme = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    userSystemTheme,
    'isDarkMode'
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode(dark => !dark);
  }

  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
      }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error('Dark Mode context must be use inside darkMode provider');

  return context;
}

export { DarkModeProvider, useDarkMode };