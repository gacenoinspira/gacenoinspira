"use client";

import React from "react";
import styles from "./card.module.css";

export function Card() {
  return (
    <div className={styles.tourist_card}>
      <img src="/img/san_luis.jpeg" alt="Guamal" className={styles.tourist_image} />
      <div className={styles.tourist_content}>
        <h3 className={styles.tourist_title}>CENTRO POBLADO GUAMAL</h3>
        <h4 className={styles.tourist_subtitle}>Naturaleza sin filtros.</h4>
        <p className={styles.tourist_description}>
          Rodeado de montañas y caminos rurales, Guamal es ideal para los
          amantes del senderismo, el avistamiento de aves y los deportes de
          agua. Aquí el turismo de aventura cobra vida entre pozos, ríos y rutas
          escondidas.
        </p>

        <div className={styles.tourist_list}>
          <strong>
            <em>Imperdibles:</em>
          </strong>
          <ol>
            <li>Caminata ecológica al Pozo El Encanto</li>
            <li>Avistamiento de aves nativas</li>
            <li>Tirolesa sobre el río Gaceno</li>
            <li>Fiestas campesinas y jornadas deportivas</li>
          </ol>
        </div>

        <button className={styles.tourist_button}>Conoce más</button>
      </div>
    </div>
  );
}
