import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import styles from "./Dashboard.module.css";
import { Hospital, Organ } from "../types";

// Configuração do Axios
const api = axios.create({
  baseURL: "http://localhost:8000/api", // Atualize conforme seu ambiente
  headers: { "Content-Type": "application/json" },
});

// Componente para renderizar uma lista genérica
const ListSection: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <div className={styles.section}>
    <h3 className={styles.subtitle}>{title}</h3>
    {items.length > 0 ? (
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    ) : (
      <p>Nenhum dado disponível.</p>
    )}
  </div>
);

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [organs, setOrgans] = useState<Organ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar dados da API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [hospitalResponse, organResponse] = await Promise.all([
          api.get<Hospital[]>("/hospitals"),
          api.get<Organ[]>("/organs"),
        ]);

        setHospitals(hospitalResponse.data || []);
        setOrgans(organResponse.data || []);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Separar órgãos por status
  const availableOrgans = organs.filter((organ) => organ.status === "available");
  const waitingOrgans = organs.filter((organ) => organ.status === "waiting");

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <h2 className={styles.subtitle}>Bem-vindo de volta, {user.username}!</h2>

      {loading ? (
        <p>Carregando dados...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <>
          {user.role === "admin" && (
            <>
              <ListSection
                title="Hospitais Cadastrados"
                items={hospitals.map((hospital) => hospital.name)}
              />
              <ListSection
                title="Órgãos Cadastrados"
                items={organs.map(
                  (organ) => `${organ.name} - ${organ.status === "available" ? "Disponível" : "Aguardando"}`
                )}
              />
            </>
          )}

          {user.role === "receptor" && (
            <ListSection
              title="Órgãos Aguardando"
              items={waitingOrgans.map((organ) => organ.name)}
            />
          )}

          {user.role === "doador" && (
            <ListSection
              title="Painel do Doador"
              items={availableOrgans.map((organ) => organ.name)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
