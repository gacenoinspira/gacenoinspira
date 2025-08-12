import React from "react";
import styles from "./where.module.css";
import { UiTabs } from "./components";
import { ContainerCards } from "./components/conatiner-card/container-cards";
import { getOperators } from "@/lib/action";
import { getDictionary } from "@/lib/translate/translate";
import { VentanaCentroPoblado } from "./components/ventana-poblado/VentanaCentroPoblado";

export default async function Page() {
  const operators = await getOperators();
  const { dictionary } = await getDictionary();
  return (
    <div className={styles.where}>
      <div className={styles.image}>
        <UiTabs dictionary={dictionary} />
      </div>
      <div className={styles.card}>
        <ContainerCards
          operators={
            operators.data?.filter(
              (operator) => operator.type_activity === 2
            ) || []
          }
          dictionary={dictionary}
        />
      </div>
      <VentanaCentroPoblado />
    </div>
  );
}
