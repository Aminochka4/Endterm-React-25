import { createContext, useContext } from "react";
import { useAuthController } from "../hooks/useAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useAuthController();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
