document.querySelector('.send-button').addEventListener('click', () => {
  const input = document.querySelector('.chat-input');
  const message = input.value.trim();

  if (!message) return;

  fetch('/chat', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({message})
  })
  .then(response => response.json())
  .then(data => {
      const chatbox = document.getElementById('chatbox');
      const newMessage = document.createElement('div');
      newMessage.textContent = 'Bot: ' + data.reply;
      chatbox.appendChild(newMessage);
      input.value = '';
  })
  .catch(error => {
      console.error('Error:', error);
  });
});
