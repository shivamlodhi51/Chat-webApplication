import { useState } from "react";
import "../style/Login.scss"

import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { storetokenInLS } = useAuth();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user.email === "admin@gmail.com" && user.password === "12345") {
        // Redirect to another page if credentials are admin credentials
        navigate("/admin");
        return;
      }

      const response = await fetch(`http://localhost:3000/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        const res_data = await response.json();
        storetokenInLS(res_data.token);
        setUser({
          email: "",
          password: "",
        });
        toast.success("Login successful");
        navigate("/find");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (err) {
      console.log("Login failed", err.message);
    }
  };

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleInput}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleInput}
            required
          />
          <button type="submit">LOGIN</button>
        </form>
        <NavLink to="/register">Don't have an account? Sign Up Here</NavLink>
      </div>
    </div>
  );
};

export default Login;
