const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from 'static' folder
app.use(express.static(path.join(__dirname, 'static')));

// OpenAI API config (v5)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
  
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }],
      });
  
      const botReply = completion.choices[0].message.content;
      res.json({ reply: botReply });
    } catch (error) {
      console.error("OpenAI API error:", error);
      res.status(500).json({ reply: 'Sorry, something went wrong!' });
    }
  });
  

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
