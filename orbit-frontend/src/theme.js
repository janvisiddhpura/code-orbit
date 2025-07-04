import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#5e35b1' },
    secondary: { main: '#ffab00' },
    background: { default: '#f5f5f5', paper: 'rgba(255, 255, 255, 0.8)' },
    gradient: { start: '#e1f5fe', end: '#b3e5fc' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { color: '#5e35b1' },
    button: { textTransform: 'none' },
  },
  shape: { borderRadius: 12 },
});
