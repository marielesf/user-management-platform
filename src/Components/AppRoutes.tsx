import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import Signup from './Signup';
import { NotFound } from './NotFound';
import { useAuth } from './useAuth';
import { useEffect } from 'react';

const AppRoutes = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const checkLogin = () => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    checkLogin();
  }, [isLoggedIn]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
