import React from "react";
import { mockOrgans } from "../data/mockData";
import styles from "./ReceptorPanel.module.css";

const ReceptorPanel: React.FC = () => (
  <div className={styles.container}>
    <h2 className={styles.title}>Bem-vindo, Receptor!</h2>
    <h3>Órgãos que você está aguardando:</h3>
    <ul className={styles.list}>
      {mockOrgans
        .filter((organ) => organ.status === "waiting")
        .map((organ) => (
          <li key={organ.id} className={styles.item}>
            {organ.name}
          </li>
        ))}
    </ul>
  </div>
);

export default ReceptorPanel;
