import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { setUserName } from './useAuth';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function SignupCard() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('userName'),
      email: data.get('email'),
      password: data.get('password'),
      address: data.get('address1'),
      city: data.get('city'),
      state: data.get('state'),
      zip: data.get('zip'),
      country: data.get('country'),
    });
    if (!data.get('userName') || !data.get('password')) {
      alert('Please enter a valid user name and password');
    } else {
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
            id="userName"
            name="userName"
            type="name"
            placeholder="JohnSmith"
            required
            size="small"
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="password" required>
            Password
          </FormLabel>
          <OutlinedInput
            id="password"
            name="password"
            type="password"
            placeholder="*************"
            required
            size="small"
          />
        </FormGrid>
        <FormGrid size={{ xs: 12 }}>
          <FormLabel htmlFor="email" required>
            Email
          </FormLabel>
          <OutlinedInput
            id="email"
            name="email"
            type="email"
            placeholder="user@test.com"
            size="small"
            typeof="email"
          />
        </FormGrid>
        <Button type="submit" variant="contained">
          Sign up
        </Button>
        <Button variant="contained" onClick={() => navigate('/')}>
          Cancel
        </Button>
      </Grid>
    </form>
  );
}
