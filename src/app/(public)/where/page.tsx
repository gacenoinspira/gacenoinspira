import React from "react";
import styles from "./where.module.css";
import { UiTabs } from "./components";
import { ContainerCards } from "./components/conatiner-card/container-cards";

export default function Page() {
  return (
    <div className={styles.where}>
      <div className={styles.image}>
        <UiTabs />
      </div>
      <div className={styles.card}>
        <ContainerCards />
      </div>
    </div>
  );
}
