/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useTabsStore } from "@/lib/store/tabs";
import styles from "./container-cards.module.css";
import { UiCard } from "../card/ui-card";
import { OperatorTableRow } from "@/lib/type";
import { DictionaryType } from "@/lib/translate/translate";
import { useRouter } from "next/navigation"; // <-- CAMBIO CLAVE: Importa desde 'next/navigation'

interface ContainerCardsProps {
  operators: OperatorTableRow[];
  dictionary: DictionaryType;
}

export function ContainerCards({ operators, dictionary }: ContainerCardsProps) {
  const tab = useTabsStore((state) => state.tab);
  const router = useRouter();

  const zoneName: Record<
    string,
    { titulo: string; descriptio: string; info: string }
  > = {
    "1": {
      titulo: dictionary.where.guamal.title,
      descriptio: dictionary.where.guamal.description,
      info: dictionary.where.guamal.info,
    },
    "2": {
      titulo: dictionary.where.teresa.title,
      descriptio: dictionary.where.teresa.description,
      info: dictionary.where.teresa.info,
    },
    "3": {
      titulo: dictionary.where.Horizontes.title,
      descriptio: dictionary.where.Horizontes.description,
      info: dictionary.where.Horizontes.info,
    },
    "4": {
      titulo: dictionary.where.LaMesa.title,
      descriptio: dictionary.where.LaMesa.description,
      info: dictionary.where.LaMesa.info,
    },
    "5": {
      titulo: dictionary.where.SanCarlos.title,
      descriptio: dictionary.where.SanCarlos.description,
      info: dictionary.where.SanCarlos.info,
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.zona}>
        <p className={styles.titulo1}>{zoneName[tab].titulo}</p>
        <p className={styles.titulo2}>{zoneName[tab].descriptio}</p>
        <p className={styles.titulo3}>{zoneName[tab].info}</p>
        <button
          onClick={() => {
            const zoneNameLocation = zoneName[tab].titulo.toLowerCase().replace(/\s+/g, '-');
            router.push(`/plans/${zoneNameLocation}`);
          }}
          className={styles['how-to-get-button']}
        >Como llegar</button>
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
