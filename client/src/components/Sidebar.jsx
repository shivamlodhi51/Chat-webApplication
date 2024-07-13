import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";

const Sidebar = ({ isMenuOpen, toggleMenu }) => {


 const {user} = useAuth();
 const { isLoggedIn } = useAuth();
 console.log("loggin", isLoggedIn);


  return (
    <div className={`sidebar ${isMenuOpen ? 'active' : ''}`}>
      <div className="toggle-button">
        <button className="menu-btn" onClick={toggleMenu}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="sidebar-header">
        <Link to="/profile">
          <div className="profile-img">
            {isLoggedIn && user? (
              <>
                <img
                  src={`http://localhost:3000/${user.profileImagePath.replace(
                    "public",
                    ""
                  )}`}
                  alt="profile photo"
                />
              </>
            ) : (
              <>
                {/* <Person sx={{ color: variables.darkgrey }} /> */}
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s" alt="profile-img" />
              </>
            )}
          </div>
          <div className="profile-name">
            <h5>{user.firstName} {user.lastName}</h5>
          </div>
        </Link>
      </div>
      {/* <div className="sidebar-header">
        <span className="sidebar-title">
          <Link to="/allchat">All chats</Link>
        </span>
        <i className="fas fa-chevron-right"></i>
      </div> */}
      <div className="sidebar-header">
        <span className="sidebar-title">
          <Link to="/find">Find Friends</Link>
        </span>
        <i className="fas fa-chevron-right"></i>
      </div>
      <div className="sidebar-header">
        <span className="sidebar-title">
          <Link to="/logout">Log out</Link>
        </span>
        <i className="fas fa-chevron-right"></i>
      </div>
    </div>
  );
};

export default Sidebar;
