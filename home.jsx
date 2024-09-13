import React, { useState } from 'react';
import './Home.css';
import Chatbot from './chatbot'; // Ensure the file name matches

const Home = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showChatbot, setShowChatbot] = useState(false); // State to manage Chatbot visibility

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return (
          <div className="about">
            <h1>About Us</h1>
            <p>We are passionate about building web solutions with React.</p>
          </div>
        );
      case 'contact':
        return (
          <div className="contact">
            <h1>Contact Us</h1>
            <p>Email: info@example.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
        );
      case 'home':
      default:
        return (
          <div className="home">
            <h1>Welcome to My Website</h1>
            <p>This is the homepage of our simple React website. Explore to learn more!</p>
            <button className="open-chatbot" onClick={() => setShowChatbot(!showChatbot)}>
              {showChatbot ? 'Close Chatbot' : 'Open Chatbot'}
            </button>
            {showChatbot && <Chatbot />} {/* Conditionally render Chatbot */}
          </div>
        );
    }
  };

  return (
    <div>
      <nav className="navbar">
        <h1>My Website</h1>
        <ul className="nav-links">
          <li>
            <button onClick={() => setCurrentPage('home')}>Home</button>
          </li>
          <li>
            <button onClick={() => setCurrentPage('about')}>About</button>
          </li>
          <li>
            <button onClick={() => setCurrentPage('contact')}>Contact</button>
          </li>
        </ul>
      </nav>
      {renderPage()}
    </div>
  );
};

export default Home;
