async function sendMessage() {
    const message = input.value.trim();
    const response = await fetch('/chat', { method: 'POST', body: JSON.stringify({message}) });
    const data = await response.json();
  }
  