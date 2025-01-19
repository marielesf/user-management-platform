import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import UserList from './UserList';
import { getUserName, pageRedirect } from './useAuth';
import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    if (!getUserName() || getUserName() === '') {
      pageRedirect('login');
    }
  }, []);
  return (
    getUserName() && (
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
            Hello {getUserName()}
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
            }}
          >
            Welcome to User Management Application.
          </Typography>
        </Stack>
        <UserList />
      </Grid>
    )
  );
}
