import React from "react";
import axios from "axios";

function BookCard({ book }) {

  // ✅ BORROW FUNCTION
  const handleBorrow = async () => {
  try {
    const email = localStorage.getItem("userEmail"); // ✅ GET EMAIL
    if (!email) {
      alert("Please login first");
      return;
    }
    const res = await axios.post(
      `http://localhost:8080/api/books/borrow?bookId=${book.id}&email=${email}`
    );

    alert(res.data);
    window.location.reload();
  } catch (error) {
    alert("Error borrowing book");
  }
};

  // ✅ RESERVE FUNCTION
  const handleReserve = async () => {
  try {
    const email = localStorage.getItem("userEmail"); // ✅ GET EMAIL
    if (!email) {
      alert("Please login first");
      return;
    }
    const res = await axios.post(
      `http://localhost:8080/api/books/reserve?bookId=${book.id}&email=${email}`
    );

    alert(res.data);
  } catch (error) {
    alert("Error reserving book");
  }
};

    const handleReturn = async () => {
  try {
    const res = await axios.post(
      `http://localhost:8080/api/books/return?bookId=${book.id}`
    );

    alert(res.data);
    window.location.reload();
  } catch (error) {
    alert("Error returning book");
  }
};

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{book.title}</h3>

      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>

      <p>
        <strong>Status:</strong>{" "}
        <span style={{ color: book.available ? "green" : "red" }}>
          {book.available ? "Available" : "Not Available"}
        </span>
      </p>

      {/* ✅ CONDITIONAL BUTTON */}
      {/* ✅ BORROW / RESERVE */}
{book.available ? (
  <button style={styles.button} onClick={handleBorrow}>
    Borrow
  </button>
) : (
  <button style={styles.button} onClick={handleReserve}>
    Reserve
  </button>
)}

{/* ✅ RETURN ONLY WHEN BOOK IS NOT AVAILABLE */}
{!book.available && (
  <button
    style={{ ...styles.button, background: "green" }}
    onClick={handleReturn}
  >
    Return
  </button>
)}
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "15px",
    margin: "10px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "220px",
    textAlign: "center",
  },

  title: {
    marginBottom: "10px",
  },

  button: {
    marginTop: "10px",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
  },
};

export default BookCard;