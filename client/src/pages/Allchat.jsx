import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import io from "socket.io-client";
import { useAuth } from "../store/auth";

let socket;

const Allchat = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      socket = io("http://localhost:3000", {
        query: { userId: user._id },
      });

      const handleMessage = (msg) => {
        setMessages((prevMessages) => {
          if (prevMessages.find((message) => message.id === msg.id)) {
            return prevMessages;
          }
          return [
            ...prevMessages,
            {
              id: msg.id,
              sender: msg.sender,
              content: msg.content,
              timestamp: new Date(msg.timestamp).toLocaleTimeString(),
              isRead: msg.isRead,
            },
          ];
        });
      };

      const handleLoadMessages = (msgs) => {
        setMessages(msgs.map((msg) => ({
          id: msg._id,
          sender: msg.sender,
          content: msg.content,
          timestamp: new Date(msg.timestamp).toLocaleTimeString(),
          isRead: msg.isRead,
        })));
      };

      socket.on("chat message", handleMessage);
      socket.on("load messages", handleLoadMessages);

      return () => {
        socket.off("chat message", handleMessage);
        socket.off("load messages", handleLoadMessages);
        socket.disconnect();
      };
    }
  }, [user]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      const msg = {
        id: Date.now(),
        sender: user.firstName,
        content: newMessage,
        timestamp: new Date().toISOString(), // Save as ISO string
        isRead: false,
      };
      socket.emit("chat message", msg);
      setMessages((prevMessages) => [...prevMessages, {
        ...msg,
        timestamp: new Date(msg.timestamp).toLocaleTimeString() // Convert to human-readable time for display
      }]);
      setNewMessage("");
    }
  };

  const filteredMessages = messages.filter((msg) =>
    msg.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-app">
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <div className="chat-window">
        <div className="chat-header">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="toggle-button">
            <button className="menu-btn" onClick={toggleMenu}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
        <div className="chat-messages">
          {filteredMessages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === user.firstName ? "you" : "other"}`}
            >
              <div className="message-content">
                <p>{msg.content}</p>
              </div>
              <div className="message-info">
                <span className="message-sender">{msg.sender}</span>
                <span className="message-timestamp">{msg.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <form id="message-form" onSubmit={handleSubmit}>
            <input
              id="message-input"
              autoComplete="off"
              value={newMessage}
              onChange={handleInputChange}
              placeholder="Type a message..."
            />
            <button id="message-send" type="submit">
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Allchat;
