import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Jessie Rollins",
      content: "Design chat",
      timestamp: "4m",
      isRead: false,
    },
    {
      id: 2,
      sender: "Osman Campos",
      content: "You: Hey! We are read...",
      timestamp: "20m",
      isRead: false,
    },
    {
      id: 3,
      sender: "Jayden Church",
      content: "I prepared some varia....",
      timestamp: "1h",
      isRead: false,
    },
    {
      id: 4,
      sender: "Jacob Mcleod",
      content: "And send me the proto...",
      timestamp: "10m",
      isRead: false,
    },
    {
      id: 5,
      sender: "Jasmin Lowery",
      content: "You: Ok! Let's discuss it on th...",
      timestamp: "20m",
      isRead: false,
    },
    {
      id: 6,
      sender: "Zaid Myers",
      content: "You: Hey! We are ready to in...",
      timestamp: "45m",
      isRead: false,
    },
    {
      id: 7,
      sender: "Anthony Cordanes",
      content: "What do you think?",
      timestamp: "1d",
      isRead: false,
    },
    {
      id: 8,
      sender: "Conner Garcia",
      content: "You: I think it would be perfe...",
      timestamp: "2d",
      isRead: false,
    },
    {
      id: 9,
      sender: "Vanessa Cox",
      content: "Voice message",
      timestamp: "2d",
      isRead: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMessages = [
        ...messages,
        {
          id: messages.length + 1,
          sender: "You",
          content: newMessage,
          timestamp: "Just now",
          isRead: false,
        },
      ];
      setMessages(newMessages);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-app">
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <div className="chat-window">
        <div className="chat-header">
          <div className="search-bar">
            <input type="text" placeholder="Search" />
          </div>
          <div className="toggle-button">
            <button className="menu-btn" onClick={toggleMenu}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        
        </div>
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender === "You" ? "you" : "other"}`}>
              <div className="message-content">
                <p>{message.content}</p>
              </div>
              <div className="message-info">
                <span className="message-sender">{message.sender}</span>
                <span className="message-timestamp">{message.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input type="text" placeholder="Your message" value={newMessage} onChange={handleInputChange} />
          <button onClick={sendMessage}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
