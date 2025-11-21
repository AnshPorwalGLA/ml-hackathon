
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 4000;
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000/ml/analyze';

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'backend' });
});

// Analyze posts: forwards to ML microservice
app.post('/api/analyze', async (req, res) => {
  try {
    const { posts } = req.body;
    if (!posts || !Array.isArray(posts) || posts.length === 0) {
      return res.status(400).json({ error: 'posts array required' });
    }

    const mlResponse = await axios.post(ML_SERVICE_URL, {
      userId: "demo-user",
      posts
    });

    res.json(mlResponse.data);
  } catch (err) {
    console.error('ML service error:', err.message);
    res.status(500).json({ error: 'Analysis failed', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
