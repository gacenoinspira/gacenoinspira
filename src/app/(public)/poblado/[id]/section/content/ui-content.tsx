"use client";

import React from "react";
import Image from "next/image";
import styles from "./content.module.css";

interface UiContentProps {
  title: string;
  description: string;
  location?: string;
  phone?: string;
  website?: string;
  images?: string[];
  onViewMore?: () => void;
  logo?: string;
}

export function UiContent({
  title = "Iglesia Centro Poblado Guamal",
  description = "La iglesia de San Luis de Guamal es un ícono arquitectónico y religioso ubicado en el corazón del municipio. Construida en el siglo XVIII, esta joya colonial destaca por su imponente fachada blanca y su campanario que se alza sobre el paisaje urbano. El interior sorprende con sus techos altos, arcos de medio punto y un retablo mayor dorado que alberga la imagen del santo patrón. Los lugareños la consideran no solo un lugar de culto, sino un símbolo de identidad y tradición que ha sido testigo de generaciones de fieles y visitantes.",
  logo = "/img/san_luis.jpeg",
}: UiContentProps) {
  return (
    <div className={styles.container}>
      <div className={styles.gallery}>
        <div className={styles.mainImage}>
          <Image
            src={logo}
            alt={title}
            style={{ objectFit: "cover" }}
            className={styles.image}
            onError={(e) => {
              e.currentTarget.src = "/img/san_luis.jpeg";
            }}
            width={100}
            height={100}
            priority={true}
          />
        </div>
        {/* <div className={styles.thumbnailContainer}>
          {galleryImages.map((img, index) => (
            <div key={index} className={styles.thumbnail}>
              <Image 
                src={img} 
                alt={`${title} ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                className={styles.image}
              />
            </div>
          ))}
        </div> */}
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {description.split(".").map((item, index) => (
          <p key={index} className={styles.description}>
            {item}
          </p>
        ))}

        {/* <div className={styles.infoContainer}>
          <div className={styles.infoItem}>
            <FaMapMarkerAlt className={styles.infoIcon} />
            <span>Carrera 5 #10-20, Centro, Guamal</span>
          </div>
          <div className={styles.infoItem}>
            <FaPhone className={styles.infoIcon} />
            <span>+57 123 456 7890</span>
          </div>
          <div className={styles.infoItem}>
            <FaGlobe className={styles.infoIcon} />
            <a href="#" className={styles.link}>www.iglesiaguamal.com</a>
          </div>
        </div> */}
      </div>
    </div>
  );
}
