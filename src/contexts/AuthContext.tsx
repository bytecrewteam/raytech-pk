import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthUser {
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem("raytech_auth") === "true";
    } catch { return false; }
  });
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const name = localStorage.getItem("raytech_user_name");
      return name ? { name, email: "" } : null;
    } catch { return null; }
  });

  const login = (u: AuthUser) => {
    setIsAuthenticated(true);
    setUser(u);
    try {
      localStorage.setItem("raytech_auth", "true");
      // Only store non-sensitive display name; email stays in memory only
      localStorage.setItem("raytech_user_name", u.name);
    } catch {}
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    try {
      localStorage.removeItem("raytech_auth");
      localStorage.removeItem("raytech_user_name");
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
