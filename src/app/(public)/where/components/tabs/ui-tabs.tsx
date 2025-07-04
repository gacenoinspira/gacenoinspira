"use client";

import React, { useState } from "react";
import styles from "./ui-tab.module.css";
import { useTabsStore } from "@/lib/store/tabs";

const tabs = [
  { id: "5", label: "Centro Poblado San Carlos del Guavio" },
  { id: "4", label: "Centro Poblado La Mesa" },
  { id: "3", label: "Centro Poblado Horizontes" },
  { id: "2", label: "Centro Poblado Santa Teresa" },
  { id: "1", label: "Centro Poblado Guamal" },
];

export function UiTabs() {
  const { tab: numberTab, setTab: updateTab } = useTabsStore((set) => set);
  const [activeTab, setActiveTab] = useState<string>(numberTab);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    updateTab(tabId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectionText}>
        <h3>Selecciona</h3>
        <p>Un centro poblado y conoce más de su oferta turística</p>
      </div>

      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${
                activeTab === tab.id ? styles.tabActive : ""
              }`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className={styles.tabContent}>
          <div className={styles.imageContainer}>
            <img
              src={`/tab/tab-map-${activeTab}.png`}
              alt={`Tab ${activeTab} content`}
              className={styles.image}
            />
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>5 centros poblados</h2>
            <p className={styles.subtitle}>
              Cinco maneras únicas de vivir el alma de Boyacá
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
