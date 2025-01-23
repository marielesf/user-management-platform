import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { pageRedirect } from './useAuth';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import React, { useContext } from 'react';
import { doLogin } from './LoginPage';
import { AppContext } from '../context/Context';
import { User } from './Types/UserTypes';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function Signup() {
  const navigate = useNavigate();
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error('AppContext is undefined');
  }
  const edit = new URLSearchParams(location.search).get('edit');
  const userId = new URLSearchParams(location.search).get('userId');

  // useEffect(() => {
  //   const handleLoad = () => {
  //     if (edit === 'true' && userId) {
  //       const user = appContext.users.find(
  //         (user) => user.id === Number(userId),
  //       );
  //       if (user) {
  //         // set values to form
  //         const userNameElement = document.getElementById(
  //           'userName',
  //         ) as HTMLInputElement;
  //         if (userNameElement) {
  //           userNameElement.value = user?.firstName + ' ' + user?.lastName;
  //         }
  //         const emailElement = document.getElementById(
  //           'email',
  //         ) as HTMLInputElement;
  //         if (emailElement) {
  //           emailElement.value = user.email;
  //         }
  //       }
  //     }
  //   };
  //   handleLoad();
  // }, [edit, userId, appContext.users]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLoad = (() => {
    if (edit === 'true' && userId) {
      const user = appContext.users.find((user) => user.id === Number(userId));
      if (user) {
        // set values to form
        const userNameElement = document.getElementById(
          'userName',
        ) as HTMLInputElement;
        if (userNameElement) {
          userNameElement.value = user?.firstName + ' ' + user?.lastName;
        }
        const emailElement = document.getElementById(
          'email',
        ) as HTMLInputElement;
        if (emailElement) {
          emailElement.value = user.email;
        }
      }
    }
  })();

  const { dispatchUserEvent } = appContext;

  const handleAddtUser = (user: User) => {
    if (edit === 'true' && userId) {
      dispatchUserEvent('EDIT_USER', user);
      return;
    } else {
      dispatchUserEvent('ADD_USER', user);
    }
  };

  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const userName = data.get('userName')?.toString() || '';
    const email = data.get('email')?.toString() || '';
    const password = data.get('password')?.toString() || '';

    if (!userName || !password) {
      setPasswordErrorMessage('Please enter a valid user name and password');
      setPasswordError(true);
    } else if (password !== data.get('passwordConfirmation')) {
      setPasswordErrorMessage('Passwords do not match');
      setPasswordError(true);
    } else if (password.length < 4) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 4 characters long.');
    } else if (userName) {
      const user: User = { email: email, fullName: userName };
      handleAddtUser(user);
      doLogin(userName, password);
      alert(`User: ${userName} created successfully!`);
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <FormLabel htmlFor="first-name">
        <h2>Sign Up</h2>
      </FormLabel>
      <Grid container spacing={3}>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="first-name" required>
            User Name
          </FormLabel>
          <OutlinedInput
            autoFocus
            id="userName"
            name="userName"
            type="name"
            placeholder="JohnSmith"
            required
            size="small"
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <OutlinedInput
            margin="dense"
            id="email"
            name="email"
            label="Email address"
            placeholder="Email address"
            type="email"
            fullWidth
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormControl>
            <FormLabel htmlFor="password" required>
              Password
            </FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
              variant="outlined"
              color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="passwordConfirmation" required>
            Password Confirmation
          </FormLabel>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="passwordConfirmation"
            placeholder="••••••"
            type="password"
            id="passwordConfirmation"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormGrid>
        <Button type="submit" variant="contained">
          Sign up
        </Button>
        <Button variant="contained" onClick={() => pageRedirect('login')}>
          Cancel
        </Button>
      </Grid>
    </form>
  );
}
