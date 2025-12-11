import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Auth.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const length = password.length >= 8;
    const special = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const number = /\d/.test(password);

    if (!length) return "Password must be at least 8 characters.";
    if (!special) return "Password must contain at least one special character.";
    if (!number) return "Password must contain at least one number.";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email.includes("@")) {
      setError("Invalid email format.");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await signup(email, password);
      navigate("/profile");
    } catch (err) {
      setError("Failed to sign up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={e => setEmail(e.target.value)} 
          required 
        />

        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={e => setPassword(e.target.value)} 
          required 
        />

        <input 
          type="password"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={e => setRepeatPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
