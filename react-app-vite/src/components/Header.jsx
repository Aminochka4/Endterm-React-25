import { Link } from "react-router-dom";
import { FaHome, FaUserAstronaut, FaSignInAlt, FaInfoCircle, FaUser } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import "./Header.css";

export default function Header() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header-left">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg"
          alt="Rick and Morty Logo"
          className="header-logo"
        />
      </div>

      <nav className="header-nav">
        <Link to="/" className="header-link">
          <FaHome className="icon" /> Home
        </Link>

        <Link to="/about" className="header-link">
          <FaInfoCircle className="icon" /> About
        </Link>

        <Link to="/characters" className="header-link">
          <FaUserAstronaut className="icon" /> Characters
        </Link>

        {user ? (
          <>
            <Link to="/profile" className="header-link">
              <FaUser className="icon" /> Profile
            </Link>
            <button onClick={handleLogout} className="header-link logout-button">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="header-link">
            <FaSignInAlt className="icon" /> Login
          </Link>
        )}
      </nav>
    </header>
  );
}
