import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useUserLogin } from '../libs/hooks/login';

interface AuthContextType {
  accessToken: string | null;
  username: string | null;
  userId: number | null;
  isAuthenticated: boolean;
  signIn: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => void;
  signOut: () => void;
  authCheck: () => void;
  authError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('userAuth must be used within an AuthProvider');
  }

  return context;
};

type AuthProviderProps = {
  children?: React.ReactElement; // 👈️ type children
};

export const AuthProvider: FunctionComponent<
  PropsWithChildren<AuthProviderProps>
> = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | false>(
    false
  );
  const [authError, setAuthError] = useState<string | null>(null);

  const userLogin = useUserLogin();

  const signIn = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    userLogin.mutate({ username, password });
  };

  useEffect(() => {
    if (userLogin.isSuccess) {
      setAccessToken(userLogin.data?.access_token as string);
      localStorage.setItem('access_token', userLogin.data?.access_token);
      setUserId(userLogin.data?.user_id as number);
      localStorage.setItem(
        'user_id',
        userLogin.data?.user_id as unknown as string
      );
      setIsAuthenticated(true);
      setUsername(userLogin.data?.username as string);
      localStorage.setItem('username', userLogin.data?.username);
      setAuthError(null);
    }

    if (userLogin.isError) {
      setAuthError('Login failed');
    }
  }, [userLogin.isSuccess, userLogin.isError, userLogin.data]);

  const signOut = () => {
    setAccessToken(null);
    localStorage.removeItem('access_token');
    setUsername(null);
    localStorage.removeItem('username');
    setUserId(null);
    localStorage.removeItem('user_id');
    setIsAuthenticated(false);
  };

  const authCheck = () => {
    const accessToken = localStorage.getItem('access_token');
    const userId = localStorage.getItem('user_id');
    setAccessToken(accessToken);
    setUsername(localStorage.getItem('username'));
    setUserId(userId ? Number(userId) : null);
    setIsAuthenticated(accessToken ? true : false);
  };
  return (
    <AuthContext.Provider
      value={{
        accessToken,
        username,
        userId,
        isAuthenticated,
        signIn,
        signOut,
        authCheck,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
