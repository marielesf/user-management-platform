import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import SignupCard from './Components/SignupCard';
import { useNavigate } from 'react-router';
import { useAuth } from './Components/useAuth';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupCard />} />
    </Routes>
  );
}

export default App;
