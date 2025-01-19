import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from 'react';

const AuthContext = createContext<{
  isLoggedIn: boolean;
  login: boolean;
}>({
  isLoggedIn: false,
  login: false,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useRef(false);

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      login.current = true;
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login: login.current }}>
      {children}
    </AuthContext.Provider>
  );
};

export const setLocalStorage = (name: string, access_token: string) => {
  localStorage.setItem('user', name);
  localStorage.setItem('access_token', access_token);
};

export const getUserName = () => {
  return localStorage.getItem('user');
};

export const pageRedirect = (page: string) => {
  console.info('pageRedirect');
  switch (page) {
    case 'login':
      if (getUserName()) {
        console.info('GO TO home');
        window.location.href = '/';
      } else {
        console.info('GO TO login');
        window.location.href = '/login';
      }
      break;
    case 'signup':
      window.location.href = '/signup';
      break;
    case 'home':
      if (getUserName()) {
        console.info('GO TO home');
        window.location.href = '/';
      } else {
        console.info('GO TO login');
        window.location.href = '/login';
      }
      break;
    default:
      window.location.href = '/notfound';
      break;
  }
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
