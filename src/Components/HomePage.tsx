import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import UserList from './UserList';
import { getUserName, pageRedirect } from './useAuth';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/Context';
import { User } from './Types/UserTypes';

export default function HomePage() {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error('AppContext is undefined');
  }
  const { users } = appContext;
  const [userLoged, setUserLoged] = useState<User>();

  useEffect(() => {
    if (!getUserName() || getUserName() === '') {
      pageRedirect('login');
    } else if (!userLoged) {
      setUserLoged(users.find((user) => user.email == getUserName()));
    }
  }, [users]);
  console.log('users:', users);
  console.log('userLoged:', userLoged);
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
              // alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
            }}
          >
            Hello {userLoged?.firstName}
          </Typography>
        </Stack>
        <UserList />
      </Grid>
    )
  );
}
