import React from "react";
import styles from "./where.module.css";
import { UiTabs } from "./components";
import { ContainerCards } from "./components/conatiner-card/container-cards";
import { getOperators } from "@/lib/action";

export default async function Page() {
  const operators = await getOperators();
  return (
    <div className={styles.where}>
      <div className={styles.image}>
        <UiTabs />
      </div>
      <div className={styles.card}>
        <ContainerCards
          operators={
            operators.data?.filter(
              (operator) => operator.type_activity === 2
            ) || []
          }
        />
      </div>
    </div>
  );
}
