import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import UserList from './UserList';
import { useNavigate } from 'react-router-dom';
import { getUserName } from './useAuth';
import { useEffect } from 'react';
import { getListUsers } from '../Service/service';

export default function HomePage() {
  const navigate = useNavigate();

  async function fetchData() {
    console.log(await getListUsers());
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container spacing={12}>
      <Stack
        spacing={2}
        useFlexGap
        sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
      >
        <Typography
          variant="h1"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            fontSize: 'clamp(3rem, 10vw, 3.5rem)',
          }}
        >
          Welcome Page to {getUserName()}
        </Typography>
        <Typography
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            width: { sm: '100%', md: '80%' },
          }}
        >
          Explore our cutting-edge dashboard, delivering high-quality solutions
          tailored to your needs. Elevate your experience with top-tier features
          and services.
        </Typography>
      </Stack>
      <UserList />
      <Button
        className="saveNameBtn"
        type="submit"
        variant="contained"
        onClick={() => navigate('/signup')}
      >
        New user
      </Button>
    </Grid>
  );
}
