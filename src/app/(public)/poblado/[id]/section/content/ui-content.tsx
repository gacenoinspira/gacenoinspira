'use client';

import React from 'react';
import Image from 'next/image';
import styles from './content.module.css';
import { FaChevronRight, FaMapMarkerAlt, FaPhone, FaGlobe } from 'react-icons/fa';

interface UiContentProps {
  title: string;
  description: string;
  location?: string;
  phone?: string;
  website?: string;
  images?: string[];
  onViewMore?: () => void;
}

export function UiContent({ 
  title = 'Iglesia Centro Poblado Guamal', 
  description = 'La iglesia de San Luis de Guamal es un ícono arquitectónico y religioso ubicado en el corazón del municipio. Construida en el siglo XVIII, esta joya colonial destaca por su imponente fachada blanca y su campanario que se alza sobre el paisaje urbano. El interior sorprende con sus techos altos, arcos de medio punto y un retablo mayor dorado que alberga la imagen del santo patrón. Los lugareños la consideran no solo un lugar de culto, sino un símbolo de identidad y tradición que ha sido testigo de generaciones de fieles y visitantes.'
}: UiContentProps) {
  // Imágenes de ejemplo (reemplazar con las imágenes reales)
  const defaultImages = [
    '/img/san_luis.jpeg',
    '/img/iglesia1.jpg',
    '/img/iglesia2.jpg',
    '/img/iglesia3.jpg',
  ];

  const images = defaultImages;
  const mainImage = images[0];
  const galleryImages = images.slice(1);

  return (
    <div className={styles.container}>
      <div className={styles.gallery}>
        <div className={styles.mainImage}>
          <Image 
            src={mainImage} 
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            className={styles.image}
          />
        </div>
        <div className={styles.thumbnailContainer}>
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
        </div>
      </div>
      
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        
        <div className={styles.infoContainer}>
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
        </div>
        
        <button className={styles.viewMoreButton}>
          Ver más
          <FaChevronRight className={styles.arrowIcon} />
        </button>
      </div>
    </div>
  );
}
