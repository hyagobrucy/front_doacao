import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminPanel.module.css";
import { Hospital } from "../types";

const AdminPanel: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHospitals = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<Hospital[]>("/api/hospitals");
      setHospitals(response.data);
    } catch (err) {
      console.error("Erro ao buscar hospitais:", err);
      setError("Não foi possível carregar os dados dos hospitais. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Administração</h1>

      {loading && <p>Carregando...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && hospitals.length > 0 ? (
        <div className={styles.cardContainer}>
          {hospitals.map((hospital) => (
            <div key={hospital.id} className={styles.card}>
              <h2 className={styles.cardTitle}>{hospital.name}</h2>
              <p className={styles.cardLocation}>{hospital.location}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && <p>Sem dados para mostrar.</p>
      )}
    </div>
  );
};

export default AdminPanel;
