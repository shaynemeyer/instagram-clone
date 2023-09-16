import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Home from './pages/Home';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';

export const queryClient = new QueryClient(); // so this client can be used in any page.

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <Header />
          <Home />
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
