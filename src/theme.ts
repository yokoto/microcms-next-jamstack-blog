import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#757575',
    },
    secondary: {
      main: '#9e9e9e',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
