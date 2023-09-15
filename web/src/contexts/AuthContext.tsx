import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
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

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
