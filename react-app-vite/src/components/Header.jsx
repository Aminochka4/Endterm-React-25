import { Link } from "react-router-dom";
import { FaHome, FaUserAstronaut, FaSignInAlt, FaInfoCircle, FaUser } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import "./Header.css";
import { useEffect, useState } from "react";
import { subscribeProfile, getProfile } from "../services/profileService";

export default function Header() {
  const { user, logout } = useAuth();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (!user) {
      setPhoto(null);
      return;
    }

    // 1️⃣ Сначала пробуем взять фото из localStorage
    const cached = localStorage.getItem(`photo_${user.uid}`);
    if (cached) setPhoto(cached);

    // 2️⃣ Подписка на Firestore, чтобы обновлять фото при изменении
    const unsubscribe = subscribeProfile(user.uid, (data) => {
      if (data?.photoURL) {
        setPhoto(data.photoURL);
        localStorage.setItem(`photo_${user.uid}`, data.photoURL); // обновляем кеш
      }
    });

    return () => unsubscribe();
  }, [user]);

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
            <Link to="/profile" className="header-link profile-link">
              {photo && (
                <img
                  src={photo}
                  alt="Profile"
                  className="header-avatar"
                />
              )}
              <FaUser className="icon" /> Profile
            </Link>

            <span className="header-user-email">{user.email}</span>

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
