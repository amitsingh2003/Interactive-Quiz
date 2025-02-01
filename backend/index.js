import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get('/api/quiz', async (req, res) => {
  try {
    const response = await axios.get('https://api.jsonserve.com/Uw5CrX', {
      headers: {
        'Accept': '*/*',
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz data' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));