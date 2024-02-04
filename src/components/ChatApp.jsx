import React, { useState } from 'react';

function ChatApp() {
  const [messages, setMessages] = useState([]);

  const handleClick = async () => {
    try {
      const response = await fetch('https://ai-llama-chat-app.shekharhans020901.workers.dev/');
      const data = await response.json();
      setMessages([...messages, data.message]);
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };

  return (
    <div>
      <h1>Chat Bot</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <button onClick={handleClick}>Get Message</button>
    </div>
  );
}

export default ChatApp;
