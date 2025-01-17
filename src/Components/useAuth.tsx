import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  login: false,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useRef(false);

  useEffect(() => {
    const UserName = getUserName();
    if (UserName) {
      login.current = true;
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login: login.current }}>
      {children}
    </AuthContext.Provider>
  );
};

export const setUserName = (user: string) => {
  localStorage.setItem('user', user);
};

export const getUserName = () => {
  return localStorage.getItem('user');
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
