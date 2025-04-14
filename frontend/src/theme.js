import { createTheme } from '@mui/material/styles';

export const themeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#72283D',
    },
    secondary: {
      main: '#f50057',
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
