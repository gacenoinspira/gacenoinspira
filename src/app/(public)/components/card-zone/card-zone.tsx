"use client";

import React from "react";
import styles from "./card-zone.module.css";
import { useRouter } from "next/navigation";
import { useTabsStore } from "@/lib/store/tabs";

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

interface Props {
  zone: string;
  main?: boolean;
}

export function CardZone({ zone, main }: Props) {
  const router = useRouter();
  const updateTab = useTabsStore((set) => set.setTab);
  return (
    <div
      className={styles.card}
      onClick={() => {
        updateTab(zone);
        router.push(`/where`);
      }}
    >
      <p className={main ? `${styles.main} ${styles.title}` : styles.title}>
        {zoneName[zone].titulo}
      </p>
      <img
        src={`/tab/tab${zone}.png`}
        alt={zoneName[zone].titulo}
        className={main ? `${styles.main} ${styles.img}` : styles.img}
      />
    </div>
  );
}
