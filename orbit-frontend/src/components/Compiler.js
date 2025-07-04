import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import {
  Box,
  Select,
  MenuItem,
  Button,
  Paper,
  Typography,
  useTheme,
  CircularProgress,
} from '@mui/material';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Compiler() {
  const theme = useTheme();
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('python');
  const [isRunning, setIsRunning] = useState(false);

  const languages = [
    { value: 'python', label: 'Python3' },
    { value: 'javascript', label: 'JavaScript' }    
  ];

  const getLanguageExtension = () => {
    switch (language) {
      case 'python': return python();    
      case 'javascript': return javascript();      
      default: return python();
    }
  }

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const filename = `code_${Date.now()}.${language === 'python' ? 'py' : 'js'}`;
      const response = await fetch(`${API_URL}/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, filename }),
      });
      const data = await response.json();
      setOutput(data.output || 'No output');
    } catch (error) {
      setOutput('Error: ' + error.message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3, background: 'linear-gradient(145deg,rgb(121, 128, 131),rgb(49, 91, 110))' }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2} gap={2}>
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          sx={{ minWidth: 120, background: 'white' }}
        >
          {languages.map((lang) => (
            <MenuItem key={lang.value} value={lang.value}>
              {lang.label}
            </MenuItem>
          ))}
        </Select>        
        <Button
          variant="contained"
          color="primary"
          onClick={handleRun}
          disabled={isRunning}
          sx={{
            background: theme.palette.secondary.main,
            '&:hover': { background: theme.palette.secondary.dark },
            animation: isRunning ? 'none' : 'pulse 2s infinite',
            px: 3,
            py: 1.5,
          }}
        >
          {isRunning ? <CircularProgress size={24} color="inherit" /> : 'Run'}
        </Button>
      </Box>
      <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
        <CodeMirror
          value={code}
          onChange={setCode}
          extensions={[getLanguageExtension()]}
          minHeight='300px'
          placeholder={`Write your ${language} code here...`}
          theme="dark"          
        />
      </div>
      <Box
        component="pre"
        sx={{
          p: 2,
          bgcolor: '#f5f5f5',
          borderRadius: 1,
          border: '1px solid #ddd',
          minHeight: '60px',
          animation: output ? 'fadeIn 0.5s ease' : 'none',
          '@keyframes fadeIn': {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
        }}
      >
        <Typography component="code" sx={{ fontFamily: 'monospace' }}>
          {output || 'Output will appear here...'}
        </Typography>
      </Box>
    </Paper>
  );
}

export default Compiler;