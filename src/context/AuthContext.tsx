import React, { createContext, ReactNode, useContext, useState } from "react";
import { mockUsers } from "../data/mockData";
import { User } from "../types";

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => User | null | undefined;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (
    username: string,
    password: string,
  ): User | null | undefined => {
    const foundUser = mockUsers.find(
      (u) => u.username === username && u.password === password,
    );
    if (foundUser) setUser(foundUser);

    return foundUser;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
