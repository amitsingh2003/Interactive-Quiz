import express from 'express';
import cors from 'cors';
import quizData from './quizdata.json' assert { type: 'json' }; // Import the JSON file

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', "https://interactive-quiz-1.onrender.com"]
}));

app.get('/api/quiz', (req, res) => {
  try {
    // Send the local quiz data directly
    res.json(quizData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to serve quiz data' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));