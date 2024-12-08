import React, { useState } from "react";
import "./Register.module.css"
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true); // Inicia o carregamento
    setErrorMessage(null); // Limpa mensagens de erro anteriores

    try {
      await api.post("/auth/register", { email, password, name, role });
      alert("Registro concluído com sucesso!");
      navigate("/auth/login");
    } catch (error: any) {
      console.error("Erro no registro:", error);
      setErrorMessage(
        error.response?.data?.message || "Erro ao tentar se registrar. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  // Validação: O botão só deve estar habilitado se todos os campos estiverem preenchidos
  const isFormValid = () => {
    return name.trim() !== "" && email.trim() !== "" && password.trim() !== "" && role.trim() !== "";
  };

  return (
    <div>
      <h2>Cadastro</h2>

      {/* Campo Nome */}
      <input
        type="text"
        placeholder="Digite seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Campo Role */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="">Selecione sua role</option>
        <option value="receptor">Receptor</option>
        <option value="doador">Doador</option>
      </select>

      {/* Campo Email */}
      <input
        type="email"
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Campo Senha */}
      <input
        type="password"
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Mensagem de erro */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Botão de registro com carregamento */}
      <button
        onClick={handleRegister}
        disabled={!isFormValid() || loading}
      >
        {loading ? "Carregando..." : "Registrar"}
      </button>
    </div>
  );
};

export default Register;
