"use client";
import React, { useState } from "react";
import { Navigate } from "./navigate/navigate";
import styles from "./page-map.module.css";
import { VentanaCentroPoblado } from "../where/components/ventana-poblado/VentanaCentroPoblado";
import { ActivityCategory } from "../where/components/conatiner-card/container-cards";

export default function PageMap() {
  const [, setTypePoblado] = useState<ActivityCategory>();
  return (
    <div className={styles.container}>
      <div className={styles.gifs}>
        <img src="/img/route.gif" alt="route" className={styles.route} />
      </div>
      <h1 className={styles.title}>
        DESCUBRE CÓMO LLEGAR A SAN LUIS DE GACENO
      </h1>
      <Navigate />
      <VentanaCentroPoblado setTypePoblado={setTypePoblado} centroPoblado="" />
    </div>
  );
}
