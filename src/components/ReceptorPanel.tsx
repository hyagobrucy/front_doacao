import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ReceptorPanel.module.css";

interface Organ {
  id: number;
  name: string;
  status: "available" | "waiting";
}

const ReceptorPanel: React.FC = () => {
  const [organs, setOrgans] = useState<Organ[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrgans = async () => {
      setLoading(true);
      setError(null); // Limpa mensagem de erro anterior
      try {
        const response = await axios.get<Organ[]>('/api/organs');
        setOrgans(response.data);
      } catch (error: any) {
        console.error("Erro ao buscar órgãos:", error);
        setError('Erro ao buscar órgãos. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrgans();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Bem-vindo, Receptor!</h2>

      {/* Mensagem de erro */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Indicador de carregamento */}
      {loading ? (
        <div className={styles.loader}>Carregando órgãos...</div>
      ) : (
        <>
          <h3>Órgãos aguardando para você:</h3>
          {organs.length > 0 ? (
            <ul className={styles.list}>
              {organs
                .filter((organ) => organ.status === "waiting")
                .map((organ) => (
                  <li key={organ.id} className={styles.item}>
                    {organ.name}
                  </li>
                ))}
            </ul>
          ) : (
            <p className={styles.noData}>Nenhum órgão aguardando no momento.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ReceptorPanel;
