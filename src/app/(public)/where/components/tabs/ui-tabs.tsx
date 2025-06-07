"use client";

import React, { useState } from "react";
import styles from "./ui-tab.module.css";

export function UiTabs() {
  const [tab, setTab] = useState<string>("1");
  return (
    <div className={styles.tab_container}>
      <div className={styles.tab_container_img}>
        <img src={`/tab/tab${tab}.png`} alt="tab" className={styles.img} />

        <button
          className={`${styles.tab} ${styles.tab__uno}`}
          onClick={() => setTab("5")}
        >
          Tab 1
        </button>
        <button
          className={`${styles.tab} ${styles.tab__dos}`}
          onClick={() => setTab("4")}
        >
          Tab 2
        </button>
        <button
          className={`${styles.tab} ${styles.tab__tres}`}
          onClick={() => setTab("3")}
        >
          Tab 3
        </button>
        <button
          className={`${styles.tab} ${styles.tab__cuatro}`}
          onClick={() => setTab("2")}
        >
          Tab 4
        </button>
        <button
          className={`${styles.tab} ${styles.tab__cuatro_uno}`}
          onClick={() => setTab("2")}
        ></button>
        <button
          className={`${styles.tab} ${styles.tab__cinco}`}
          onClick={() => setTab("1")}
        >
          tab 5
        </button>
      </div>
    </div>
  );
}
