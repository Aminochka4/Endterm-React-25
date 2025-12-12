import { useEffect, useState, useCallback } from "react";
import { 
  subscribeToAuth, 
  loginService, 
  signupService, 
  logoutService 
} from "../services/authService";

export function useAuthController() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = useCallback((email, password) => loginService(email, password), []);
  const signup = useCallback((email, password) => signupService(email, password), []);
  const logout = useCallback(() => logoutService(), []);

  return { user, loading, login, signup, logout };
}