import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Home from './pages/Home';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';

export const queryClient = new QueryClient(); // so this client can be used in any page.

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <>
          <div className="app">
            <Header />
            <Home />
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
