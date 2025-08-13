"use client";

import React from "react";
import styles from "./content.module.css";
import Image from "next/image";

interface UiContentProps {
  title: string;
  description: string;
  location?: string;
  phone?: string;
  website?: string;
  images?: string[];
  onViewMore?: () => void;
  logo?: string;
  activity?: string[];
  rules?: string[];
  img?: string[];
  indications?: string;
}

export function UiContent({
  title = "Iglesia Centro Poblado Guamal",
  description = "La iglesia de San Luis de Guamal es un ícono arquitectónico y religioso ubicado en el corazón del municipio. Construida en el siglo XVIII, esta joya colonial destaca por su imponente fachada blanca y su campanario que se alza sobre el paisaje urbano. El interior sorprende con sus techos altos, arcos de medio punto y un retablo mayor dorado que alberga la imagen del santo patrón. Los lugareños la consideran no solo un lugar de culto, sino un símbolo de identidad y tradición que ha sido testigo de generaciones de fieles y visitantes.",
  logo = "/img/san_luis.jpeg",
  activity = [],
  rules = [],
  indications = "",
  images = [],
}: UiContentProps) {
  return (
    <div className={styles.container}>
      

      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {description.split(".").map((item, index) => (
          <p key={index} className={styles.description}>
            {item}
          </p>
        ))}
        {!!activity.length && (
          <>
            <h2 className={`${styles.title} ${styles.mt}`}>Actividades</h2>
            <ul className={styles.ul}>
              {activity.map((item, index) => (
                <li key={index} className={styles.li}>
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}
        <div className={styles.imageContainer}>
          <Image
            src={images[0] || logo}
            alt={title}
            width={500}
            height={300}
            className={styles.ImagenMedium}
          />
        </div>
      <div className={styles.gallery}>
      </div>
        {indications && (
          <>
            <h2 className={`${styles.title} ${styles.mt}`}>
              ¿Cómo puedo llegar?
            </h2>
            <p className={styles.paragraph}>{indications}</p>
          </>
        )}
        {!!rules.length && (
          <>
            <h2 className={`${styles.title} ${styles.mt}`}>Recomendaciones</h2>
            <ul className={styles.ul}>
              {rules.map((item, index) => (
                <li key={index} className={styles.li}>
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}
        {images.length && (
          <div className={styles.imageContainer}>
            <Image
              src={images[1] || logo}
              alt={title}
              width={500}
              height={300}
              className={styles.ImagenMedium}
            />
          </div>
        )}
      </div>
    </div>
  );
}
