import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("coursemind_token"));
  const [email, setEmail] = useState(() => localStorage.getItem("coursemind_email"));

  const signIn = useCallback((newToken, userEmail) => {
    localStorage.setItem("coursemind_token", newToken);
    localStorage.setItem("coursemind_email", userEmail);
    setToken(newToken);
    setEmail(userEmail);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("coursemind_token");
    localStorage.removeItem("coursemind_email");
    setToken(null);
    setEmail(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, email, signIn, signOut, isAuthenticated: Boolean(token) }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
