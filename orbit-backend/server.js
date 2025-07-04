const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

async function runCommand(cmd, cwd) {
  return new Promise((resolve) => {
    exec(cmd, { cwd, timeout: 10000 }, (error, stdout, stderr) => {
      console.log(`Command: ${cmd}\nOutput: ${stdout}\nError: ${stderr}`);
      resolve({ error, stdout, stderr });
    });
  });
}

app.post('/run', async (req, res) => {
  const { code, language, filename } = req.body;
  if (!code || !language || !filename) {
    return res.status(400).json({ error: 'Code, language, and filename required' });
  }

  const ext = language === 'python' ? 'py' : 'js';
  const fullFilename = path.join(tempDir, filename);

  try {
    // Write code to file
    fs.writeFileSync(fullFilename, code);

    // Run the code
    let cmd;
    const pythonCmd = process.env.PYTHON_CMD || 'python3';
    if (language === 'python') {
      cmd = `${pythonCmd} ${fullFilename}`;
    } else {
      cmd = `node ${fullFilename}`;
    }
    const result = await runCommand(cmd, tempDir);

    // Clean up
    fs.unlinkSync(fullFilename);

    // Send response
    if (result.error) {
      res.json({ output: result.stderr || result.error.message });
    } else {
      res.json({ output: result.stdout });
    }
  } catch (err) {
    try { fs.unlinkSync(fullFilename); } catch (e) { console.error('Failed to clean up:', e); }
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => console.log(`Backend running on ${PORT}`));