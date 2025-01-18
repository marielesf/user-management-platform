import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { pageRedirect, setUserName, useAuth } from './useAuth';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import React from 'react';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function Signup() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('userName'),
      password: data.get('password'),
      passwordConfirmation: data.get('passwordConfirmation'),
    });
    if (!data.get('userName') || !data.get('password')) {
      setPasswordErrorMessage('Please enter a valid user name and password');
      setPasswordError(true);
    } else if (data.get('password') !== data.get('passwordConfirmation')) {
      setPasswordErrorMessage('Passwords do not match');
      setPasswordError(true);
    } else if ((data.get('password') as string).length < 4) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 4 characters long.');
    } else if (data.get('userName')) {
      alert(`User: ${data.get('userName')} created successfully!`);
      setUserName(data.get('userName')!.toString());
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <Button
          type="submit"
          variant="contained"
          //onClick={() => pageRedirect(isLoggedIn)}
        >
          Sign up
        </Button>
        <Button variant="contained" onClick={() => pageRedirect(isLoggedIn)}>
          Cancel
        </Button>
      </Grid>
    </form>
  );
}
