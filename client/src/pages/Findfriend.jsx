import React, { useEffect, useState } from "react";
import axios from 'axios';
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth"; // Import useAuth to get the logged-in user info

const Findfriend = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useAuth(); // Get the logged-in user
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/alluser");
      setMyData(response.data.userData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (userId) => {
    navigate(`/chat/${userId}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredAndSortedUsers = myData
    .filter((userData) => {
      // Filter out the logged-in user
      return userData._id !== user._id && `${userData.firstName} ${userData.lastName}`.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
      return nameA.localeCompare(nameB);
    });

  return (
    <div className="chat-app">
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <div className="chat-window">
        <div className="chat-header">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
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
          {filteredAndSortedUsers.map((userData) => (
                <>
            <div key={userData._id} className="user-box" onClick={() => handleUserSelect(userData._id)}>
              <div className="message-content">
                <span>
                <img
                  src={`http://localhost:3000/${userData.profileImagePath.replace(
                    "public",
                    ""
                  )}`}
                  alt="profile photo"
                  /></span>
                <p>{userData.firstName} {userData.lastName}</p>
              </div>
            </div>
                  </>
          ))}
          {filteredAndSortedUsers.length === 0 && (
            <div className="no-messages">No users found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Findfriend;
