const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/' +
  'gemini-2.0-flash:generateContent';

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, hasKey: !!GEMINI_API_KEY });
});

app.post('/api/gemini', async (req, res) => {
  try {
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Missing GEMINI_API_KEY on server' });
    }

    const { prompt, systemPrompt } = req.body || {};
    if (!prompt || !String(prompt).trim()) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt || '' }]
        },
        contents: [{
          parts: [{ text: prompt || '' }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024
        }
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Gemini API error:', data);
      return res.status(response.status).json({ error: data?.error?.message || 'Gemini API request failed' });
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    res.json({ result: text });
  } catch (err) {
    console.error('Gemini proxy error:', err);
    res.status(500).json({ error: 'Gemini request failed' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Gemini proxy running on port ${PORT}`);
});
