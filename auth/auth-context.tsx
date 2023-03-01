import { createContext, FC, useContext, useState } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  signIn: (email: string, password: string) => {}
});

type Props = {
  children?: JSX.Element
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = (email: string, password: string) => {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
      .then(res => res.json())
      .then(res => {
        setIsAuthenticated(res.success);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      signIn,
    }}>
      {children}
    </AuthContext.Provider>
  )
};
