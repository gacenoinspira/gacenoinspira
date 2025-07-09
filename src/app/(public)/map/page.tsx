import React from "react";
import { Navigate } from "./navigate/navigate";
import styles from "./page-map.module.css";

export default function PageMap() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        DESCUBRE CÓMO LLEGAR A SAN LUIS DE GACENO
      </h1>
      <Navigate />
    </div>
  );
}
