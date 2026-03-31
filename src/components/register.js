import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    studentId: "",
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:8080/api/users/register", user);
      alert("Registered Successfully");

      // 👉 redirect to login after register
      navigate("/");
    } catch (error) {
      alert("Error in Registration");
    }
  };

  return (
  <div style={styles.container}>
    <div style={styles.card}>
      <h2 style={styles.title}>Register</h2>

      <input name="studentId" placeholder="Student ID" onChange={handleChange} style={styles.input} />
      <input name="name" placeholder="Name" onChange={handleChange} style={styles.input} />
      <input name="email" placeholder="Email" onChange={handleChange} style={styles.input} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} style={styles.input} />

      <button onClick={handleRegister} style={styles.button}>
        Register
      </button>

      <p>
        Already have an account?{" "}
        <Link to="/" style={styles.link}>
          Login
        </Link>
      </p>
    </div>
  </div>
);
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
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
    fontSize: "26px",
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
    background: "#28a745",
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

export default Register;