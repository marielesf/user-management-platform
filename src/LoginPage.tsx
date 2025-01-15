import { Paper, FormControlLabel, Checkbox, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import React from 'react';

const LoginPage = () => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div style={{ padding: 30 }}>
      <Paper>
        
            <TextField label="Username"></TextField>
         
            <TextField label="Password" type={'password'}></TextField>
         
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  //label={'Keep me logged in'}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              }
              label="Keep me logged in"
            />
          
            <Button fullWidth> Login </Button>
          
      </Paper>
    </div>
  );
};

export default LoginPage;
