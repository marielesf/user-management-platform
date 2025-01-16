import Grid from '@mui/material/Grid2';
// import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import UserList from './UserList';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// const FormGrid = styled(Grid)(() => ({
//   display: 'flex',
//   flexDirection: 'column',
// }));

const ValidateUserName  = () =>{
  const nameFromLocalStorage = localStorage.getItem("name")

  if (nameFromLocalStorage) {
    return true;
  } else {
    return false;
  }
}
export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!ValidateUserName()) {
      navigate('/SignInCard');
    }
  }, [navigate]);

  return (
    <Grid container spacing={12}>
        <Button
          className="saveNameBtn"
          type="submit"
          fullWidth
          variant="contained"
          onClick={() => navigate('/SignupCard')}
        >
          New user
        </Button>
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
            Welcome Page
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: 'inherit',
                color: 'primary.main',
                ...theme.applyStyles('dark', {
                  color: 'primary.light',
                }),
              })}
            >
              products
            </Typography>
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
    </Grid>
  );
}
