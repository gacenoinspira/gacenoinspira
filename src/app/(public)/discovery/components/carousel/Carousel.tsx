"use client";

import React, { useRef } from 'react';
import styles from "../../discvery.module.css";
import { UiCard } from "./../card/ui-card";
import { OperatorTableRow } from '@/lib/type';

// Tipos para las props del carrusel


interface CarouselProps {
  operators: OperatorTableRow[] | null;
}

export function Carousel({ operators }: CarouselProps) {
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
  
  // Si no hay operadores, no mostramos nada
  if (!operators || operators.length === 0) {
    return null;
  }

  return (
    <div className={styles.carouselControls}>
      <button onClick={scrollLeft} className={styles.carouselButton}>
        {"<"}
      </button>
      <div ref={carouselRef} className={styles.container_card_carousel}>
        {operators
          .filter((operator) => operator.type_activity === 4)
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
  );
}
