import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
import { useUserLogin } from '../libs/hooks/login';
import { tokenIsExpired } from '../libs/jwtHelper';

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
    userLogin.mutate(
      { username, password },
      {
        onSuccess: (data) => {
          setAccessToken(data?.access_token as string);
          localStorage.setItem('access_token', data?.access_token);
          setUserId(data?.user.id as number);
          localStorage.setItem('user_id', data?.user.id as unknown as string);
          setIsAuthenticated(true);
          setUsername(data?.user.username as string);
          localStorage.setItem('username', data?.user?.username);
          setAuthError(null);
        },
        onError: () => {
          setAuthError('Login failed');
        },
      }
    );
  };

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
    let expired = false;
    if (accessToken) {
      expired = tokenIsExpired(accessToken);
    }

    if (expired) signOut();

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
