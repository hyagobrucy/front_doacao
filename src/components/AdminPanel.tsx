import React from "react";
import { mockHospitals } from "../data/mockData";
import styles from "./AdminPanel.module.css";

const AdminPanel: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Administração</h1>
      {mockHospitals.map((hospital) => (
        <div key={hospital.id} className={styles.card}>
          <h2 className={styles.cardTitle}>{hospital.name}</h2>
          <button className={styles.button}>Remover</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
