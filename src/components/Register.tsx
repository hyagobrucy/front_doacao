import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../data/mockData";
import { User } from "../types";
import styles from "./Register.module.css";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "receptor" | "doador">("receptor");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (mockUsers.find((user) => user.username === username)) {
      setMessage("Usuário já existe. Escolha outro nome.");
      return;
    }

    const newUser: User = {
      id: mockUsers.length + 1,
      username,
      password,
      role,
    };

    mockUsers.push(newUser);
    setMessage("Registro realizado com sucesso!");
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <form className={styles.container} onSubmit={handleRegister}>
      <h1>Cadastro</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
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
      <div>
        <label className={styles.label}>Tipo de Conta</label>
        <select
          className={styles.select}
          value={role}
          onChange={(e) =>
            setRole(e.target.value as "admin" | "receptor" | "doador")
          }
        >
          <option value="receptor">Receptor</option>
          <option value="doador">Doador</option>
        </select>
      </div>
      <button className={styles.button} type="submit">
        Registrar
      </button>
    </form>
  );
};

export default Register;
