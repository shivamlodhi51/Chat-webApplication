import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../store/auth";

const Chatuser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const user = useAuth();
  useEffect(() => {
    // Fetch list of users from the server
    axios.get('http://localhost:3000/user/alluser/')
      .then(response => {
        setUsers(response.data.userData);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  // Function to load messages for a selected user
  const loadMessages = (userId) => {
    // You can fetch messages for the selected user here
    // For example:
    axios.get(`http://localhost:3000/chat/messages/${user._id}`)
      .then(response => {
        setMessages(response.data.messages);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
    // For demonstration, let's assume messages are loaded for a hardcoded user
    setMessages([]);
  };

  // Function to handle user selection
  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
    loadMessages(userId);
  };

  return (
    <div className="chatuser-container">
      <div className="user-list">
        <h2>Users</h2>
        <ul>
          {users.map(user => (
            <li key={user._id} onClick={() => handleUserSelect(user._id)}>
              <Link to={`/chat/${user._id}`}>{user.firstName} {user.lastName}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="message-box">
        {selectedUser && (
          <div>
            <h2>Messages from {selectedUser}</h2>
            <ul>
              {messages.map(message => (
                <li key={message.id}>{message.content}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatuser;
