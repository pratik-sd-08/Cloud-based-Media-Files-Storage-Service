import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    await api.get("/auth/logout");
    navigate("/auth");
    window.location.reload();
  };

  return (
    <div className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/files">Files</Link>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}
