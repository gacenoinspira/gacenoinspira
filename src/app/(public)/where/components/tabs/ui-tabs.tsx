"use client";

import React, { useState } from "react";
import styles from "./ui-tab.module.css";
import { useTabsStore } from "@/lib/store/tabs";
import { DictionaryType } from "@/lib/translate/translate";

const tabs = [
  { id: "5", label: "Centro Poblado San Carlos del Guavio" },
  { id: "4", label: "Centro Poblado La Mesa" },
  { id: "3", label: "Centro Poblado Horizontes" },
  { id: "2", label: "Centro Poblado Santa Teresa" },
  { id: "1", label: "Centro Poblado Guamal" },
];

interface UiTabsProps {
  dictionary: DictionaryType;
}

export function UiTabs({ dictionary }: UiTabsProps) {
  const { tab: numberTab, setTab: updateTab } = useTabsStore((set) => set);
  const [activeTab, setActiveTab] = useState<string>(numberTab);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    updateTab(tabId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectionText}>
        <h3>{dictionary.where.title}</h3>
        <p>{dictionary.where.subtitle}</p>
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
            <h2 className={styles.title}>{dictionary.where.title_2}</h2>
            <p className={styles.subtitle}>{dictionary.where.subtitle_2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
