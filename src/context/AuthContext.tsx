import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { api } from "../api/api";
import { User } from "../types";

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<string | null>;
  logout: () => void;
  error?: string; // Mensagem de erro para capturar erros do login
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await api.get("/user");
          setUser(response.data);
        } catch (error) {
          console.error("Erro ao verificar autenticação:", error);
          localStorage.removeItem("token");
          setError("Erro ao validar autenticação. Por favor, faça login novamente.");
        }
      }
      setIsLoading(false);
    };

    checkUser();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post("/login", { email: username, password });
      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        setError(undefined);
        return response.data.token;
      } else {
        setError("Falha no login. Usuário ou senha inválidos.");
        return null;
      }
    } catch (error: any) {
      console.error("Erro no login:", error);
      setError(error.response?.data?.message || "Erro ao fazer login.");
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setError(undefined);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para consumir o contexto
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
