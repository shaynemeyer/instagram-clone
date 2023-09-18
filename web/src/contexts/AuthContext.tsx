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
      setUserId(userLogin.data?.user_id as number);
      setIsAuthenticated(true);
      setUsername(userLogin.data?.username as string);
      setAuthError(null);
    }

    if (userLogin.isError) {
      setAuthError('Login failed');
    }
  }, [userLogin.isSuccess, userLogin.isError, userLogin.data]);

  const signOut = () => {
    setAccessToken(null);
    setUsername(null);
    setUserId(null);
    setIsAuthenticated(false);
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
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
