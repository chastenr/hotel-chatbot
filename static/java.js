document.querySelector('.send-button').addEventListener('click', async () => {
    const input = document.querySelector('.chat-input');
    const message = input.value.trim();
    if (!message) return;
  
    const chatbox = document.getElementById('chatbox');
    chatbox.innerHTML += `<div>You: ${message}</div>`;
  
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