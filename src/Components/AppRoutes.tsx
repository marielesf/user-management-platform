import { Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import Signup from './Signup';
import { NotFound } from './NotFound';

const AppRoutes = () => {
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
