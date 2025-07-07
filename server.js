const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// OpenAI API config
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // from Render env variables
});
const openai = new OpenAIApi(configuration);

// Chat endpoint
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: userMessage }],
    });

    const botReply = completion.data.choices[0].message.content;
    res.json({ reply: botReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: 'Sorry, something went wrong!' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
