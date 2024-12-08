import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./DonorPanel.module.css";

interface Organ {
  id: number;
  name: string;
  status: "available" | "waiting";
}

// Componente reutilizável para listas
const OrganList: React.FC<{ organs: Organ[] }> = ({ organs }) => (
  <ul className={styles.list}>
    {organs.map((organ) => (
      <li key={organ.id} className={styles.item}>
        {organ.name} - Status: {organ.status === "available" ? "Disponível" : "Aguardando"}
      </li>
    ))}
  </ul>
);

const DonorPanel: React.FC = () => {
  const [organs, setOrgans] = useState<Organ[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Estado para gerenciar erros

  useEffect(() => {
    const fetchOrgans = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<Organ[]>("/api/organs");
        setOrgans(response.data);
      } catch (err) {
        console.error("Erro ao buscar órgãos:", err);
        setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrgans();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Bem-vindo, Doador!</h2>
      <h3>Seus órgãos cadastrados:</h3>

      {loading && <p>Carregando dados...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && organs.length > 0 && <OrganList organs={organs} />}
      {!loading && !error && organs.length === 0 && <p>Você ainda não cadastrou nenhum órgão.</p>}
    </div>
  );
};

export default DonorPanel;
