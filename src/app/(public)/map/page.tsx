import React from "react";
import { Navigate } from "./navigate/navigate";
import styles from "./page-map.module.css";

export default function PageMap() {
  return (
    <div className={styles.container}>
      <div className={styles.gifs}>
        <img src="/img/route.gif" alt="route" className={styles.route} />
      </div>
      <h1 className={styles.title}>
        DESCUBRE CÓMO LLEGAR A SAN LUIS DE GACENO
      </h1>
      <Navigate />
      <div className={styles.doing}>
        <p className={styles.text}>
          5 cosas que debes saber antes de viajar a <b>San Luis de Gaceno</b>
        </p>
        <div className={styles.line} />
        <div className={styles.contenIcon}>
          <div className={styles.cardIcon}>
            <img src="/img/sol.svg" alt="sol" />
            <p className={styles.info}>Clima cálido todo el año</p>
          </div>
          <div className={styles.cardIcon}>
            <img src="/img/ubication.svg" alt="ubication" />
            <p className={styles.info}>Ubicación estratégica</p>
          </div>
          <div className={styles.cardIcon}>
            <img src="/img/people.svg" alt="people" />
            <p className={styles.info}>Actividades para todos los gustos</p>
          </div>
          <div className={styles.cardIcon}>
            <img src="/img/ticket.svg" alt="ticket" />
            <p className={styles.info}>Cultura viva entre montañas y sabanas</p>
          </div>
          <div className={styles.cardIcon}>
            <img src="/img/people-2.svg" alt="people-2" />
            <p className={styles.info}>Apoya lo local y vive mejor</p>
          </div>
        </div>
      </div>
    </div>
  );
}
