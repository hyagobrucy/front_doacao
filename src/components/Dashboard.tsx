import React from "react";
import { useAuth } from "../context/AuthContext";
import { mockHospitals, mockOrgans, mockUsers } from "../data/mockData";
import styles from "./Dashboard.module.css";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const doadores = mockUsers.filter((user) => user.role === "doador");
  const receptores = mockUsers.filter((user) => user.role === "receptor");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <h1 className={styles.title}>Bem-vindo de volta, {user!.username}</h1>

      {user!.role === "admin" && (
        <>
          <div className={styles.section}>
            <h2 className={styles.subtitle}>Usuários Cadastrados</h2>
            <h3>Doadores:</h3>
            <ul className={styles.list}>
              {doadores.map((user) => (
                <li key={user.id} className={styles.item}>
                  {user.username}
                </li>
              ))}
            </ul>
            <h3>Receptores:</h3>
            <ul className={styles.list}>
              {receptores.map((user) => (
                <li key={user.id} className={styles.item}>
                  {user.username}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.subtitle}>Hospitais Cadastrados</h2>
            <ul className={styles.list}>
              {mockHospitals.map((hospital) => (
                <li key={hospital.id} className={styles.item}>
                  {hospital.name}
                </li>
              ))}
            </ul>
            <button className={styles.button}>Cadastrar Hospital</button>
          </div>

          <div className={styles.section}>
            <h2 className={styles.subtitle}>Órgãos Cadastrados</h2>
            <ul className={styles.list}>
              {mockOrgans.map((organ) => (
                <li key={organ.id} className={styles.item}>
                  {organ.name} -{" "}
                  {organ.status === "available" ? "Disponível" : "Aguardando"}
                </li>
              ))}
            </ul>
            <button className={styles.button}>Cadastrar Órgão</button>
          </div>
        </>
      )}

      {user!.role === "receptor" && (
        <div className={styles.section}>
          <h2 className={styles.subtitle}>Órgãos Aguardando</h2>
          <ul className={styles.list}>
            {mockOrgans
              .filter((organ) => organ.status === "waiting")
              .map((organ) => (
                <li key={organ.id} className={styles.item}>
                  {organ.name} - Aguardando
                </li>
              ))}
          </ul>
        </div>
      )}

      {user!.role === "doador" && (
        <div className={styles.section}>
          <h2 className={styles.subtitle}>Painel do Doador</h2>
          <p>Obrigado por ser um doador!</p>
          <ul className={styles.list}>
            {mockOrgans
              .filter((organ) => organ.status === "available")
              .map((organ) => (
                <li key={organ.id} className={styles.item}>
                  {organ.name} - Disponível
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
