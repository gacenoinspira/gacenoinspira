/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useMemo, Dispatch, SetStateAction } from "react";
import { useTabsStore } from "@/lib/store/tabs";
import styles from "./container-cards.module.css";
import { UiCard } from "../card/ui-card";
import { OperatorTableRow } from "@/lib/type";
import { DictionaryType } from "@/lib/translate/translate";
import { useRouter } from "next/navigation";

// Define las categorías de actividad.
export type ActivityCategory = "Actividades para todos los gustos" | "Cultura viva entre montañas y sabanas";

interface ContainerCardsProps {
  operators: OperatorTableRow[];
  dictionary: DictionaryType;
  typeCentroPoblado: ActivityCategory;
  setTypePoblado: Dispatch<SetStateAction<ActivityCategory | undefined>>;
}

export function ContainerCards({ operators, dictionary, typeCentroPoblado, setTypePoblado }: ContainerCardsProps) {
  const tab = useTabsStore((state) => state.tab);
  const router = useRouter();

  const zoneName: Record<
    string,
    { titulo: string; descriptio: string; info: string; category?: string }
  > = {
    "1": {
      titulo: dictionary?.where.guamal.title,
      descriptio: dictionary?.where.guamal.description,
      info: dictionary?.where.guamal.info,
    },
    "2": {
      titulo: dictionary?.where.teresa.title,
      descriptio: dictionary?.where.teresa.description,
      info: dictionary?.where.teresa.info,
    },
    "3": {
      titulo: dictionary?.where.Horizontes.title,
      descriptio: dictionary?.where.Horizontes.description,
      info: dictionary?.where.Horizontes.info,
    },
    "4": {
      titulo: dictionary?.where.LaMesa.title,
      descriptio: dictionary?.where.LaMesa.description,
      info: dictionary?.where.LaMesa.info,
    },
    "5": {
      titulo: dictionary?.where.SanCarlos.title,
      descriptio: dictionary?.where.SanCarlos.description,
      info: dictionary?.where.SanCarlos.info,
    },
  };

  const filteredOperators = useMemo(() => {
    const zoneOperators = operators.filter((operator) => operator.zone_id === Number(tab));
    
    return zoneOperators.filter(operator => {
        // Corrección: Usamos 'operator.categoria' en lugar de 'operator.category'
        const categoryName = operator.categoria || "";
        if (typeCentroPoblado === "Actividades para todos los gustos") {
            return categoryName.toLowerCase().includes("gustos");
        }
        if (typeCentroPoblado === "Cultura viva entre montañas y sabanas") {
            return categoryName.toLowerCase().includes("cultura");
        }
        return false;
    });
  }, [operators, tab, typeCentroPoblado]);

  return (
    <div className={styles.container}>
      {/* Sección de texto y tabs (columna izquierda en pantallas grandes) */}
      <div className={styles.leftColumn}>
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
          >
            Como llegar
          </button>
        </div>
        
        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tab} ${typeCentroPoblado === "Actividades para todos los gustos" ? styles.activeTab : ""}`}
            onClick={() => setTypePoblado("Actividades para todos los gustos")}
          >
            Actividades para todos los gustos
          </button>
          <button
            className={`${styles.tab} ${typeCentroPoblado === "Cultura viva entre montañas y sabanas" ? styles.activeTab : ""}`}
            onClick={() => setTypePoblado("Cultura viva entre montañas y sabanas")}
          >
            Cultura viva entre montañas y sabanas
          </button>
        </div>

        <div className={styles.card}>
          {filteredOperators.map((operator) => (
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
      </div>
      
      {/* Sección de la imagen/mapa (columna derecha en pantallas grandes) */}
      <div className={styles.img}>
        <img src={`/tab/tab${tab}.png`} alt={zoneName[tab].titulo} />
      </div>
    </div>
  );
}