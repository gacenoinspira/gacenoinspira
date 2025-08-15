"use client";

import React, { useRef, useEffect } from 'react';
import styles from "../../discvery.module.css";
import { UiCard } from "./../card/ui-card";
import { OperatorTableRow } from '@/lib/type';

/**
 * Props para el componente de carrusel.
 * @interface CarouselProps
 * @property {OperatorTableRow[] | null} operators - La lista de operadores para mostrar.
 */
interface CarouselProps {
  operators: OperatorTableRow[] | null;
}

/**
 * Componente de carrusel con movimiento automático y controles de navegación.
 * @param {CarouselProps} props - Las propiedades del componente.
 * @returns {JSX.Element | null} Un carrusel de tarjetas o null si no hay operadores.
 */
export function Carousel({ operators }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Filtramos los operadores para obtener solo los de tipo de actividad 4
  const filteredOperators = operators ? operators.filter((operator) => operator.type_activity === 4) : [];

  /**
   * Desplaza el carrusel hacia la izquierda.
   */
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  /**
   * Desplaza el carrusel hacia la derecha, con un bucle infinito.
   */
  const scrollRight = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      
      // Lógica de bucle: si está cerca del final, regresa al principio
      // Se utiliza un pequeño margen de 100px para una transición más suave
      if (scrollLeft + clientWidth >= scrollWidth - 100) {
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
      }
    }
  };

  /**
   * useEffect para el movimiento automático del carrusel.
   */
  useEffect(() => {
    if (!carouselRef.current || filteredOperators.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      scrollRight();
    }, 2000); // Se mueve cada 2 segundos

    // Limpia el intervalo cuando el componente se desmonta para evitar fugas de memoria
    return () => clearInterval(interval);
  }, [filteredOperators]);

  // Si no hay operadores filtrados, no renderizamos nada
  if (filteredOperators.length === 0) {
    return null;
  }

  return (
    <div className={styles.carouselControls}>
      <button onClick={scrollLeft} className={styles.carouselButton}>
        {"<"}
      </button>
      <div ref={carouselRef} className={styles.container_card_carousel}>
        {filteredOperators.map((operator) => (
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
