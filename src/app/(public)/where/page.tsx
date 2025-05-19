import React from "react";
import { Card, Sections } from "../components";
import styles from "./where.module.css";

export default function Page() {
  return (
    <div>
      <Sections className={styles.where}>
        <h1 className={styles.hero_title}>
          Explora cada rincón de San Luis de Gaceno.
        </h1>
        <p className={styles.hero_subtitle}>
          Cinco centros poblados, cinco maneras únicas de vivir el alma de
          Boyacá.
        </p>
        <p className={styles.hero_description}>
          Desde caminatas por senderos naturales hasta fiestas llenas de
          tradición, aquí encuentras la ruta perfecta para ti.
        </p>
      </Sections>
      <Sections className={styles.section_card}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Sections>
    </div>
  );
}
