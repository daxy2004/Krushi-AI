import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      const newMessages = [...messages, { sender: 'user', text: input }];
      setMessages(newMessages);
      setInput('');

      setTimeout(() => {
        const botReply = generateBotReply(input);
        setMessages([...newMessages, { sender: 'bot', text: botReply }]);
      }, 1000); // Simulate bot response delay
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const generateBotReply = (input) => {
    // Simple response logic (you can replace this with API calls)
    if (input.toLowerCase().includes('hello')) {
      return 'Hi there! How can I help you?';
    } else if (input.toLowerCase().includes('help')) {
      return 'Sure, I am here to assist. What do you need help with?';
    } else {
      return 'I am not sure how to respond to that. Can you try asking something else?';
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.sender === 'bot' ? 'bot' : 'user'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
