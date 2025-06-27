/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useTabsStore } from "@/lib/store/tabs";
import styles from "./container-cards.module.css";
import { UiCard } from "../card/ui-card";
import { OperatorTableRow } from "@/lib/type";

const zoneName: Record<
  string,
  { titulo: string; descriptio: string; info: string }
> = {
  "1": {
    titulo: "Centro Poblado Guamal",
    descriptio: "Naturaleza sin filtros",
    info: "Rodeado de montañas y caminos rurales, Guamal es ideal para los amantes del senderismo, el avistamiento de aves y los deportes de agua. Aquí el turismo de aventura cobra vida entre pozos, ríos y rutas escondidas",
  },
  "2": {
    titulo: "Centro Poblado Santa Teresa",
    descriptio: "Encuentro con la paz interior.",
    info: "Santa Teresa es ideal para desconectar y reconectar. Su entorno natural, su gente cálida y su tranquilidad lo hacen perfecto para caminatas suaves, retiros o actividades culturales.",
  },
  "3": {
    titulo: "Centro Poblado Horizontes",
    descriptio: "Ventana a la inmensidad boyacense",
    info: "Horizontes hace honor a su nombre con paisajes abiertos y vistas privilegiadas. Es el lugar perfecto para descansar, tomar fotografías panorámicas o iniciar rutas hacia otros centros.",
  },
  "4": {
    titulo: "Centro Poblado La Mesa",
    descriptio: "Café, campo y calma",
    info: "La Mesa ofrece experiencias rurales auténticas, desde recorridos por cafetales hasta talleres de cocina local. Aquí la tierra se siente y se saborea.",
  },
  "5": {
    titulo: "Centro Poblado San Carlos del Guavio",
    descriptio: "Corazón cultural y festivo del municipio.",
    info: "Centro administrativo y social, aquí confluyen la historia, la música, la danza y las tradiciones más vivas. Es el punto de encuentro para grandes festividades y mercados",
  },
};

interface ContainerCardsProps {
  operators: OperatorTableRow[];
}

export function ContainerCards({ operators }: ContainerCardsProps) {
  const tab = useTabsStore((state) => state.tab);

  return (
    <div className={styles.container}>
      <div className={styles.zona}>
        <p className={styles.titulo1}>{zoneName[tab].titulo}</p>
        <p className={styles.titulo2}>{zoneName[tab].descriptio}</p>
        <p className={styles.titulo3}>{zoneName[tab].info}</p>
      </div>
      <div className={styles.card}>
        {operators
          .filter((operator) => operator.zone_id === Number(tab))
          .map((operator) => (
            <UiCard
              key={operator.id}
              title={operator.name}
              description={operator.description}
              price={"0"}
              imageUrl={operator.logo || "/img/san_luis.jpeg"}
              id={operator.id}
            />
          ))}
      </div>
      <div className={styles.img}>
        <img src={`/tab/tab${tab}.png`} alt={zoneName[tab].titulo} />
      </div>
    </div>
  );
}
