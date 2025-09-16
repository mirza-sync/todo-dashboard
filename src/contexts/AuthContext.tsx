import { createContext, useEffect, useState, type ReactNode } from "react";
import { type User } from "../types/user";
import { apiDelay } from "../utils";

const CREDENTIALS = {
  userid: "ali123",
  username: "ali",
};

type AuthContextType = {
  user?: User | null;
  isLoading: boolean;
  login: (userid: string, username: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkUser = () => {
      try {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        sessionStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (userid: string, username: string) => {
    setIsLoading(true);

    await apiDelay();
    if (userid === CREDENTIALS.userid && username === CREDENTIALS.username) {
      const userData = { userid, username };
      setUser(userData);
      sessionStorage.setItem("user", JSON.stringify(userData));
    } else {
      console.error("Invalid credentials");
    }

    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
