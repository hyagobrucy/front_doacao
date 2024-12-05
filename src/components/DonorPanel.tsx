import React from "react";
import { mockOrgans } from "../data/mockData";
import styles from "./DonorPanel.module.css";

const DonorPanel: React.FC = () => (
  <div className={styles.container}>
    <h2 className={styles.title}>Bem-vindo, Doador!</h2>
    <h3>Seus órgãos cadastrados:</h3>
    <ul className={styles.list}>
      {mockOrgans.map((organ) => (
        <li key={organ.id} className={styles.item}>
          {organ.name} - Status:{" "}
          {organ.status === "available" ? "Disponível" : "Aguardando"}
        </li>
      ))}
    </ul>
  </div>
);

export default DonorPanel;
