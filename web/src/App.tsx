import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Home from './pages/Home';
import { AuthProvider } from './contexts/AuthContext';

export const queryClient = new QueryClient(); // so this client can be used in any page.

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Home />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
