import { ThemeProvider } from 'styled-components';
import './App.css';
import AppRoutes from './Components/AppRoutes';
import createTheme from '@mui/material/styles/createTheme';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
