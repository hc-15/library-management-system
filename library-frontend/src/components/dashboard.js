import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "https://library-management-system-tu7q.onrender.com";
function Dashboard() {
  const navigate = useNavigate();

  const [borrowed, setBorrowed] = useState([]);
  const [reserved, setReserved] = useState([]);

  const userEmail = localStorage.getItem("userEmail");
   // 👉 DEBUG: Check if email is retrieved
  // ✅ LOAD DATA PROPERLY
  useEffect(() => {
  const fetchData = async () => {
    try {
      const bor = await axios.get(
        `${API_BASE}/api/books/my-books?email=${userEmail}`
      );

      const res = await axios.get(
        `${API_BASE}/api/books/reserved?email=${userEmail}`
      );

      setBorrowed(bor.data);
      setReserved(res.data);
    } catch (err) {
      console.error("API ERROR:", err);
    }
  };

  if (!userEmail) {
    navigate("/");
    return;
  }

  fetchData();
}, [navigate, userEmail]);
  const logout = () => {
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* NAVBAR */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>e-Kindle</h2>

        <div style={styles.rightSection}>
          <button style={styles.logoutBtn} onClick={logout}>
            Logout
          </button>

          <button
            style={styles.backBtn}
            onClick={() => navigate("/home")}
          >
            ← Back
          </button>
        </div>
      </div>

      <h2 style={styles.heading}>Student Dashboard</h2>

      <div style={styles.grid}>
        {/* BORROWED */}
        <div style={styles.card}>
          <h3>📚 Borrowed Books</h3>

          {borrowed.length === 0 ? (
            <p>No books yet</p>
          ) : (
            borrowed.map((b, i) => (
              <p key={i}>Book ID: {b.bookId}</p>
            ))
          )}
        </div>

        {/* DUE DATES */}
        <div style={styles.card}>
          <h3>⏳ Due Dates</h3>
          {borrowed.length === 0 ? (
            <p>No due dates</p>
          ) : (
            borrowed.map((b, i) => (
              <p key={i}>{b.dueDate}</p>
            ))
          )}
        </div>

        {/* FINES */}
        <div style={styles.card}>
          <h3>💰 Fines</h3>
          {borrowed.length === 0 ? (
            <p>No fines</p>
          ) : (
            borrowed.map((b, i) => (
              <p key={i}>₹{b.fine}</p>
            ))
          )}
        </div>

        {/* RESERVED */}
        <div style={styles.card}>
          <h3>📖 Reserved Books</h3>

          {reserved.length === 0 ? (
            <p>No reservations</p>
          ) : (
            reserved.map((r, i) => (
              <p key={i}>Book ID: {r.bookId}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f5f6fa",
    textAlign: "center",
    padding: "20px 60px",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "white",
    borderBottom: "1px solid #eee",
  },

  logo: {
    margin: 0,
  },

  heading: {
    marginTop: "30px",
    marginBottom: "20px",
  },

  grid: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  logoutBtn: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    background: "#ff4d4f",
    color: "white",
    cursor: "pointer",
  },

  backBtn: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    background: "#eee",
    cursor: "pointer",
  },
};

export default Dashboard;
