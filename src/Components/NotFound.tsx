import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div>
      <h1> 404 </h1>
      <p>Oops! The page you're looking for is not here.</p>
      <Link
        component={RouterLink}
        to="/login"
        variant="body2"
        sx={{ alignSelf: 'center' }}
      >
        Login here
      </Link>
    </div>
  );
};
