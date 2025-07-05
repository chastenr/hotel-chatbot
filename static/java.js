document.querySelector('.send-buton').addEventListener('click', async () => {
  const input = document.querySelector('.chat-input');
  const message = input.value.trim();
  if (!message) return;

  // Show user's message in the chatbox
  const chatbox = document.getElementById('chatbox');
  chatbox.innerHTML += `<div>You: ${message}</div>`;

  // Send to backend
  try {
      const response = await fetch('/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message })
      });
      const data = await response.json();
      chatbox.innerHTML += `<div>Bot: ${data.reply}</div>`;
  } catch (error) {
      chatbox.innerHTML += `<div style="color:red;">Error talking to bot</div>`;
  }

  input.value = '';
});
