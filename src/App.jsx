import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import AppLayout from './components/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { useDarkMode } from './context/darkModeContext';
import GlobalStyles from './styles/GlobalStyles';
 
import Employees from './pages/Employees';
import Home from './pages/Home';
import Login from './pages/Login';
import ManageAccount from './pages/ManageAccount';
import PageNotFound from './pages/PageNotFound';
import ProjectDetail from './pages/ProjectDetail';
import Signup from './pages/Signup';
import TaskDetail from './pages/TaskDetail';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  margin: 0 auto;
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
});

function App() {
  const { isDarkMode } = useDarkMode();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Signup />} />
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }>
              <Route index element={<Navigate replace to={'home'} />} />
              <Route path="home" element={<Home />} />
              <Route path="manage" element={<ManageAccount />} />

              <Route path="employee" element={<Employees />} />
              <Route path="project/:projectId" element={<ProjectDetail />} />
              <Route path="task/:taskId" element={<TaskDetail />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer
          autoClose={3000}
          pauseOnFocusLoss={false}
          theme={isDarkMode ? 'dark' : 'light'}
        />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
