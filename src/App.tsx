import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { ChakraProvider } from '@chakra-ui/react';
import CarPage from './pages/CarPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PrivateRoutes from './utils/PrivateRoutes';
import LoginPage from './pages/LoginPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const App: React.FC = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <PrivateRoutes>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/car" element={<CarPage />} />
          </Routes>
        </PrivateRoutes>

        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </ChakraProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
