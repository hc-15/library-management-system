import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
      });

      if (response.data === "Login Successful") {
        alert("Login Successful");
        localStorage.setItem("userEmail", email);
        navigate("/home"); // go to homepage
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      alert("Error connecting to server");
    }
  };

  return (
  <div className="app" style={styles.container}>
    <div style={styles.card}>
      <h1 style={styles.title}>e-Kindle</h1>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>

      <p>
        Don't have an account?{" "}
        <Link to="/register" style={styles.link}>
          Register
        </Link>
      </p>
    </div>
  </div>
);
}

const styles = {
  container: {
    height: "100vh",
    width:"100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #36d1dc, #5b86e5)",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    background: "#ffffff",
    padding: "40px 30px",
    borderRadius: "12px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "320px",
  },

  title: {
    marginBottom: "25px",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
  },

  input: {
    marginBottom: "15px",
    padding: "12px",
    width: "100%",
    borderRadius: "6px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
  },

  button: {
    marginTop: "10px",
    padding: "12px",
    width: "100%",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.3s",
  },

  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login;