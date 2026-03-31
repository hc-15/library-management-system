import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BookCard from "./bookcard";

function Home() {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // 🔥 SEARCH FUNCTION
  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await axios.get(
        `http://localhost:8080/api/books/search?keyword=${query}`
      );
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const books = [
    { name: "Atomic Habits", img: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg" },
    { name: "Rich Dad Poor Dad", img: "https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg" },
    { name: "The Alchemist", img: "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg" },
    { name: "Think and Grow Rich", img: "https://covers.openlibrary.org/b/isbn/9781585424337-L.jpg" },
    { name: "Ikigai", img: "https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg" },
    { name: "Deep Work", img: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg" },
    { name: "Start With Why", img: "https://covers.openlibrary.org/b/isbn/9781591846444-L.jpg" },
    { name: "Zero to One", img: "https://covers.openlibrary.org/b/isbn/9780804139298-L.jpg" },
    { name: "The Power of Habit", img: "https://covers.openlibrary.org/b/isbn/9780812981605-L.jpg" },
    { name: "Can't Hurt Me", img: "https://covers.openlibrary.org/b/isbn/9781544512280-L.jpg" },
  ];

  return (
    <div style={styles.container}>

      {/* 🔥 NAVBAR */}
      <div style={styles.navbar}>
        <div style={styles.left}>
          <h2 style={styles.logo}>e-Kindle</h2>

          <input
            placeholder="Search books (title, author, category)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            style={styles.search}
          />
        </div>

        <div style={styles.right}>
          <div style={styles.menuWrapper}>
            <div
              style={styles.menuIcon}
              onClick={() => setOpenMenu(!openMenu)}
            >
              ☰
            </div>

            {openMenu && (
              <div style={styles.dropdown}>
                <p>Borrow Books</p>
                <p>Reserve Books</p>
                <p>View Fines</p>
              </div>
            )}
          </div>

          <div
            style={styles.profile}
            onClick={() => navigate("/dashboard")}
          >
            👤
          </div>
        </div>
      </div>

      {/* 🔥 SEARCH RESULTS (INLINE) */}
      {results.length > 0 && (
        <div style={styles.searchResults}>
          {results.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      {/* 🔥 DEFAULT BOOK GRID */}
      <div style={styles.grid}>
        {books.map((book, index) => (
          <div key={index} style={styles.card}>
            <img src={book.img} alt={book.name} style={styles.image} />
            <p style={styles.bookName}>{book.name}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f5f6fa",
  },

  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "#ffffff",
    borderBottom: "1px solid #eee",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  logo: {
    margin: 0,
    fontWeight: "bold",
  },

  search: {
    padding: "10px",
    width: "320px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  menuWrapper: {
    position: "relative",
  },

  menuIcon: {
    fontSize: "22px",
    cursor: "pointer",
  },

  dropdown: {
    position: "absolute",
    top: "35px",
    right: 0,
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    padding: "10px",
    width: "160px",
  },

  profile: {
    fontSize: "20px",
    cursor: "pointer",
    background: "#eee",
    padding: "8px",
    borderRadius: "50%",
  },

  /* 🔥 SEARCH RESULTS */
  searchResults: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px 40px",
  },

  /* DEFAULT GRID */
  grid: {
    padding: "20px 40px",
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "25px",
    justifyItems: "center",
  },

  card: {
    width: "160px",
    background: "white",
    padding: "12px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "6px",
  },

  bookName: {
    marginTop: "10px",
    fontWeight: "500",
    fontSize: "14px",
  },
};

export default Home;