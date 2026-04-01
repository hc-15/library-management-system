import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div style={styles.nav}>
      <h2>Library System</h2>

      <div>
        <button onClick={() => navigate("/home")}>Home</button>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    background: "#333",
    color: "white"
  }
};

export default Navbar;