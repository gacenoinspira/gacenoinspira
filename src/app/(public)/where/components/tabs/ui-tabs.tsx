"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./ui-tab.module.css";
import { useTabsStore } from "@/lib/store/tabs";
import { DictionaryType } from "@/lib/translate/translate";
import Image from "next/image";
const tabs = [
  { id: "5", label: "Centro Poblado San Carlos del Guavio" },
  { id: "4", label: "Centro Poblado La Mesa" },
  { id: "3", label: "Centro Poblado Horizontes" },
  { id: "2", label: "Centro Poblado Santa Teresa" },
  { id: "1", label: "Centro Poblado Guamal" },
];

interface UiTabsProps {
  dictionary: DictionaryType;
  setCentroPoblado : Dispatch<SetStateAction<string>>
}

export function UiTabs({ dictionary, setCentroPoblado }: UiTabsProps) {
  const { tab: numberTab, setTab: updateTab } = useTabsStore((set) => set);
  const [activeTab, setActiveTab] = useState<string>(numberTab);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    updateTab(tabId);
  };

  useEffect(() => {
    setActiveTab(numberTab);
    // Update the centroPoblado state when the component mounts
    const selectedTab = tabs.find((tab) => tab.id === numberTab);
    if (selectedTab) {
      setCentroPoblado(selectedTab.label);
    }
  },[])

  const scrollToSection = (id: string) => {
    // 1. Encontrar el elemento en el DOM por su ID.
    const element = document.getElementById(id);
    
    // 2. Si el elemento existe, llama a scrollIntoView.
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth', // Hace que el desplazamiento sea suave y animado.
        block: 'start',     // Alinea el elemento en la parte superior de la vista.
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectionText}>
        <h3>{dictionary?.where.title}</h3>
        <p>{dictionary?.where.subtitle}</p>
        {/* <p>Hola</p> */}
      </div>

      <div className={styles.tabsContainer}>
        <div className={styles.tabContent}>
          <div className={styles.imageContainer}>
            {
              tabs.map((tab) => (
                <>
                  <div 
                    className={ styles.imageWrapper } 
                    key={tab.id}
                    onClick={() => {
                      handleTabClick(tab.id);
                      setCentroPoblado(tab.label);
                      scrollToSection('container-cards')
                    }}
                  >
                    <Image
                    width={140}
                    height={190}
                    key={Math.random()} // Using random key for demo purposes, ideally use a unique identifier
                    // src="/tab/tab-map.png"
                    src={  `/tab/tab-map-${tab.id}.png`  }
                    alt="Tab Map"
                    className={styles.image}
                    />
                    <p> { tab.label } </p>
                  </div>
                  
                </>
              ))
            }
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>{dictionary?.where.title_2}</h2>
            <p className={styles.subtitle}>{dictionary?.where.subtitle_2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}