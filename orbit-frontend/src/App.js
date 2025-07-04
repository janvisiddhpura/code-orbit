import { ThemeProvider, CssBaseline, Container, Typography, Box } from '@mui/material';
import Compiler from './components/Compiler';
import { AnimatedBackground } from 'animated-backgrounds';
import { theme } from './theme';

export default function App() {
  return (
    <div className="app-container">
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnimatedBackground animationName="starryNight" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1, backgroundColor: "#000000", opacity: 0.9 }} />
      <Container maxWidth="md" sx={{ pt: 4, pb: 4 }}>
        <Box mb={4}>
          <Typography variant="h3" align="center" gutterBottom>
            OrbitRun
          </Typography>
          <Typography variant="subtitle1" color='white' align="center" gutterBottom>
            Compile and run code in multiple languages!
          </Typography>
        </Box>
        <Compiler />
      </Container>
    </ThemeProvider>
    </div>
  );
}