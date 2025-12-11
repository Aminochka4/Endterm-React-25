import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { saveProfilePicture, getProfile } from "../services/profileService";
import "../styles/Auth.css";

export default function Profile() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading]);

  useEffect(() => {
    if (user) {
      getProfile(user.uid).then((data) => {
        if (data?.photoURL) setPhoto(data.photoURL);
      });
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const worker = new Worker(new URL("../workers/imageCompressor.js", import.meta.url));
    worker.postMessage(file);
    worker.onmessage = async (event) => {
      const compressedBase64 = event.data;
      await saveProfilePicture(user.uid, compressedBase64);
      setPhoto(compressedBase64);
      setMessage("Фото успешно обновлено!");
      worker.terminate();
    };
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {photo && (
        <img
          src={photo}
          alt="Profile"
          style={{ width: "120px", borderRadius: "50%", marginBottom: "10px" }}
        />
      )}
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>UID:</strong> {user.uid}</p>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {message && <p>{message}</p>}

      <button className="logout-btn" onClick={() => { logout(); navigate("/login"); }}>Logout</button>
    </div>
  );
}
