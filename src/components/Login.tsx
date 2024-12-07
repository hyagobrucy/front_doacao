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
 <div className={styles.form_container}>
 <p className={styles.title}>Login</p>
 {error && <p style={{ color: "red" }}>{error}</p>}
 <form className={styles.Form} onSubmit={handleSubmit}>
   <input type="text" className={styles.input} value={username} placeholder="Usuário" onChange={(e) => setUsername(e.target.value)} /> 
   <input type="password" className={styles.input} value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
   <button type="submit" className={styles.form_btn}>Entrar</button>
 </form>
 <p className={styles.sign_up_label}>
   Não tem uma conta? <a className={styles.sing_up_link} href="/register">Criar Conta</a>
 </p>
 </div>
</div>

  );
};

export default Login;
