'use client';
import React, { useEffect, useState } from "react";
import styles from "./where.module.css";
import { UiTabs } from "./components";
import { ActivityCategory, ContainerCards } from "./components/conatiner-card/container-cards";
import { getOperators } from "@/lib/action";
import { DictionaryType, getDictionary } from "@/lib/translate/translate";
import { VentanaCentroPoblado } from "./components/ventana-poblado/VentanaCentroPoblado";
import { OperatorTableRow } from "@/lib/type";


export default function Page() {

  const [operators, setOperators] = useState<OperatorTableRow[] | null>([]);
  const [dictionary, setDictionary] = useState<DictionaryType>();
  const [centroPoblado, setCentroPoblado] = useState<string>("");
  const [typeCentroPoblado, setTypePoblado] = useState<ActivityCategory>();

  useEffect(() => {
    const fetchData = async () => {
      const operatorsData = await getOperators();
      const dictionaryData = await getDictionary();
      setOperators(operatorsData.data || []);
      setDictionary(dictionaryData.dictionary);
    }

    fetchData();
  }, [])

  const returStringForMap = (): string => centroPoblado.toLowerCase().replace(/\s+/g, '-') ; 
  
  
  return (
    <div className={styles.where}>
      <div className={styles.image}>
        <UiTabs 
          dictionary={dictionary ! as DictionaryType} 
          setCentroPoblado={setCentroPoblado}
        />
      </div>
      <div id="container-cards" className={styles.card}>
        <ContainerCards
          operators={
            operators?.filter(
              (operator) => operator.type_activity === 2
            ) || []
          }
          dictionary={dictionary ! as DictionaryType}
          typeCentroPoblado={ typeCentroPoblado || 'Actividades para todos los gustos' }
          setTypePoblado={ setTypePoblado }
        />
      </div>
      <VentanaCentroPoblado 
        centroPoblado={ returStringForMap() } 
        setTypePoblado={ setTypePoblado }
      />
    </div>
  );
}
