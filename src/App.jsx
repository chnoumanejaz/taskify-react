import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PageNotFound from './pages/PageNotFound';
import ManageAccount from './pages/ManageAccount';
import Employees from './pages/Employees';
import ProjectDetail from './pages/ProjectDetail';
import TaskDetail from './pages/TaskDetail';
import AppLayout from './components/AppLayout';
import GlobalStyles from './styles/GlobalStyles';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute';
import { DarkModeProvider } from './context/darkModeContext';

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
  return (
    <DarkModeProvider>
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
            theme="light"
          />
        </Container>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
