"use client";

import React, { useRef } from "react";
import styles from "./../../discvery.module.css";
import Image from "next/image";
import { UiCard } from "./../card/ui-card";

// Definiciones de tipos para los datos
export interface Operator {
  id: string;
  name?: string;
  logo?: string;
  type_activity: number;
}

export interface OperatorsData {
  data?: Operator[];
}

export interface ImagePageData {
  data?: {
    discovery: string;
  };
}

export interface DictionaryData {
  discovery: {
    title: string;
    subtitle: string;
    paragraphUno: string;
    comillas: string;
    paragraphDos: string;
    paragraphTres: string;
  };
}

// Definición de tipos para las props del componente de cliente
export interface CarouselClientComponentProps {
  operators: OperatorsData | null;
  dictionary: DictionaryData;
  imgPage: ImagePageData;
}

// Componente de Cliente para el carrusel
export function CarouselClientComponent({ operators, dictionary, imgPage }: CarouselClientComponentProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heroContainer}>
        {/* Usamos la imagen del servidor si existe, de lo contrario, usamos el fallback */}
        <Image
          src={imgPage.data?.discovery || "/img/san_luis.jpeg"}
          alt="Paisaje de San Luis de Gaceno"
          fill // Usa la prop 'fill' para que la imagen ocupe todo el contenedor
          style={{ objectFit: 'cover' }} // Asegura que la imagen cubra el contenedor sin deformarse
          priority
        />
        <div className={styles.ImagesContent}>
          <Image
            src="/img/diamante.webp"
            alt="diamante"
            className={styles.image}
            width={100}
            height={100}
          />
          <div className={styles.carouselControls}>
            <button onClick={scrollLeft} className={styles.carouselButton}>
              {"<"}
            </button>
            <div ref={carouselRef} className={styles.container_card_carousel}>
              {operators?.data
                ?.filter((operator) => operator.type_activity === 4)
                .map((operator) => (
                  <UiCard
                    key={operator.id}
                    id={operator.id}
                    img={operator.logo || "/img/san_luis.jpeg"}
                    title={operator.name || undefined}
                  />
                ))}
            </div>
            <button onClick={scrollRight} className={styles.carouselButton}>
              {">"}
            </button>
          </div>
        </div>
      </div>
      <h1 className={styles.title}>
        {dictionary.discovery.title}
        <br />
        {dictionary.discovery.subtitle}
      </h1>

      <div className={styles.content}>
        <p className={styles.paragraph}>
          {dictionary.discovery.paragraphUno}
          <b> {dictionary.discovery.comillas}</b>
          {dictionary.discovery.paragraphDos}
        </p>

        <p className={styles.paragraph}>{dictionary.discovery.paragraphTres}</p>
      </div>
    </div>
  );
}
