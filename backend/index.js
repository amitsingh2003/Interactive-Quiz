import express from 'express';
import cors from 'cors';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const quizData = require('./quizdata.json');

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', "https://interactive-quiz-1.onrender.com"]
}));

app.get('/api/quiz', (req, res) => {
  try {
   
    res.json(quizData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to serve quiz data' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));