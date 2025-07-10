"use client";

import { useNavegationStore } from "@/lib/store/navegation";
import React from "react";
import styles from "./navegation.module.css";

export function Navigate() {
  const value = useNavegationStore((state) => state.value);
  return (
    <div className={styles.container}>
      <div className={styles.container__title}>
        {/* <div>
          <p className={styles.question}>¿Cómo llegar?</p>
          <p>Te ayudamos a llegar sin perderte</p>
        </div> */}
        <div className={styles.info}>
          <p>
            <b>¿Quieres viajar a SAN LUIS DE GACENO?</b> Encuentra a cuántas
            horas estás, desde cualquier parte de Colombia Te esperamos para que
            descubras por qué San Luis de Gaceno inspira
          </p>
        </div>
      </div>
      <iframe
        src={`https://www.google.com/maps/embed/v1/directions?key=${
          process.env.NEXT_PUBLIC_GOOGLE
        }&origin=${value.lat},${
          value.lng
        }&destination=${4.8202},${-73.1684}&avoid=tolls|highways`}
        width="95%"
        height="600"
        style={{ border: "none" }}
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
