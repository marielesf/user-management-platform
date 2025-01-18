import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { pageRedirect, setUserName, useAuth } from './useAuth';
// import { useNavigate } from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function LoginPage() {
  //const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [userNameError, setUserNameError] = React.useState(false);
  const [userNameErrorMessage, setUserNameMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (userNameError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const validateInputs = () => {
    const userName = document.getElementById('userName') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!userName.value || !(userName.value.length > 0)) {
      setUserNameError(true);
      setUserNameMessage('Please enter a valid user name.');
      isValid = false;
    } else {
      setUserNameError(false);
      setUserNameMessage('');
    }

    if (!password.value || !(password.value.length > 4)) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be valid.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    if (isValid) {
      setUserName(userName.value);
    }
    return isValid;
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}></Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="userName">User Name</FormLabel>
          <TextField
            error={userNameError}
            helperText={userNameErrorMessage}
            id="userName"
            name="userName"
            placeholder="name"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={userNameError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControl>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
          checked={true}
        />
        <Button
          className="saveNameBtn"
          type="submit"
          fullWidth
          variant="contained"
          onClick={() => {
            if (validateInputs()) {
              pageRedirect(isLoggedIn);
            }
          }}
        >
          Sign in
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <span>
            <Link
              variant="body2"
              sx={{ alignSelf: 'center' }}
              onClick={() => pageRedirect(isLoggedIn)}
            >
              Sign up
            </Link>
          </span>
        </Typography>
      </Box>
    </Card>
  );
}
