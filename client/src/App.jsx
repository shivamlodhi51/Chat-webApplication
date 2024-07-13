import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import AllChat from "./pages/Allchat";
import Findfriend from "./pages/Findfriend";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Chat from "./components/Chat";
import Chatuser from "./pages/Chatuser"
function App() {

  return (
   
     <BrowserRouter>
      <Routes>
      <Route path="/chat/:userId" element={<Chat />} />
      {/* <Route path="/allchat" element={<AllChat />} /> */}
        <Route path="/find" element={<Findfriend />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/" element={<Login />}/>
        <Route path="/logout" element={<Logout />}/>
        <Route path="/user" element={<Chatuser />}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;
