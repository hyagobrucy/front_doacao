import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setToken } from "../api/api";
import styles from "./Login.module.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Limpa mensagens de erro e inicia o carregamento
    setErrorMessage(null);
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });
      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        setToken(token);
        alert("Login bem-sucedido!");
        navigate("/auth/dashboard");
      } else {
        setErrorMessage("Erro inesperado. Por favor, tente novamente.");
      }
    } catch (error: any) {
      console.error("Erro no login:", error);

      if (error.response && error.response.status === 401) {
        setErrorMessage("Credenciais inválidas. Verifique seu e-mail e senha.");
      } else {
        setErrorMessage("Erro ao conectar ao servidor. Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/auth/register");
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h2 className={styles.title}>Login</h2>
        
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        
        <input
          type="email"
          placeholder="Digite seu e-mail"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input
          type="password"
          placeholder="Digite sua senha"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <div className={styles.registerSection}>
        <p>Não tem conta?</p>
        <button className={styles.button} onClick={handleRegisterRedirect}>
          Cadastre-se
        </button>
      </div>
    </div>
  );
};

export default Login;
