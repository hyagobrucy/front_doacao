import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Login.module.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = login(username, password);
    if (user) {
      navigate("/dashboard");
    } else {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <label className={styles.label}>Usuário</label>
          <input
            className={styles.input}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu usuário"
          />
        </div>
        <div>
          <label className={styles.label}>Senha</label>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </div>
        <div className={styles.containerButtons}>
          <button className={styles.button} type="submit">
            Entrar
          </button>
          <a className={styles.register} href="/register">
            Criar conta
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
