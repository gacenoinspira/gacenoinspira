'use client';

/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import styles from './BannerPrincipal.module.css';
import { AnimatedText } from '@/components/AnimatedText';
import { getCarouselItems } from '@/lib/action/carousel-items';
import { CarouselTableRow } from '@/lib/repository/carousel-items';

// He definido las imágenes por defecto aquí, en caso de que la base de datos no devuelva nada.
const DEFAULT_IMAGES: CarouselTableRow[] = [
  {
    id: 'default-1',
    src: 'https://jhgjlennmeuftwcsiacf.supabase.co/storage/v1/object/public/fotos/Tol%C3%BA/tolu_banner_1.jpeg',
    alt: 'Tolú Banner 1',
    title: 'Aún no has visto todo sobre Tolú.',
    subtitle: 'Vuela y descubre sus paisajes encantadores.',
    location: 'Archipiélago de San Bernardo GRAN CARIBE COLOMBIANO',
    buttonText: 'Explora Ahora',
    link: '#discover-section',
    created_at: ''
  },
  {
    id: 'default-2',
    src: 'https://jhgjlennmeuftwcsiacf.supabase.co/storage/v1/object/public/fotos/Tol%C3%BA/tolu_banner_2.jpeg',
    alt: 'Tolú Banner 2',
    title: 'Explora las maravillas ocultas.',
    subtitle: 'Sumérgete en la cultura y aventura.',
    location: 'Vive la magia del Caribe Colombiano',
    buttonText: 'Explorar ahora',
    link: '#discover-section',
    created_at: '',
  },
  {
    id: 'default-3',
    src: 'https://jhgjlennmeuftwcsiacf.supabase.co/storage/v1/object/public/fotos/Tol%C3%BA/tolu_banner_3.jpeg',
    alt: 'Tolú Banner 3',
    title: 'Playas paradisíacas te esperan.',
    subtitle: 'Relájate y disfruta del sol caribeño.',
    location: 'Costas infinitas, experiencias únicas',
    buttonText: 'Explora Ahora',
    link: '#discover-section',
    created_at: '',
  }
];

export function BannerPrincipal() {
  // Estado para almacenar las imágenes obtenidas de la base de datos o las predeterminadas
  const [images, setImages] = useState<CarouselTableRow[]>(DEFAULT_IMAGES);
  // Estado para controlar el índice de la imagen actual
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // useEffect para cargar las imágenes al montar el componente
  useEffect(() => {
    // Definimos una función asíncrona para llamar a nuestra acción del servidor
    const fetchImages = async () => {
      try {
        const response = await getCarouselItems();
        // Si la respuesta es exitosa y hay datos, los usamos. Si no, usamos las imágenes por defecto.
        if (response.status && response.data && response.data.length > 0) {
          setImages(response.data);
        } else {
          console.warn("No se encontraron imágenes en la base de datos. Usando imágenes predeterminadas.");
          setImages(DEFAULT_IMAGES);
        }
      } catch (e: any) {
        console.error("Error al cargar las imágenes desde la base de datos, usando imágenes predeterminadas:", e);
        setImages(DEFAULT_IMAGES);
      }
    };
    fetchImages();
  }, []);

  // useEffect para el carrusel automático
  useEffect(() => {
    // Solo iniciamos el intervalo si hay imágenes disponibles (ya sean de la DB o por defecto)
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  const handleExploreClick = (e: React.MouseEvent<HTMLButtonElement>, link: string) => {
    e.preventDefault();
    const targetElement = document.querySelector<HTMLElement>(link);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentImage = images[currentImageIndex];

  return (
    <section
      className={styles.banner_section}
      style={{ backgroundImage: `url(${currentImage.src})` }}
    >
      <div className={styles.color_strip}></div>
      <div className={styles.overlay}></div>
      
      <div className={styles.content_wrapper}>
        <div className={styles.text_content}>
          <AnimatedText className={`${styles.title} ${styles.mainTitle}`}>
            {currentImage.title}
          </AnimatedText>
          <AnimatedText delay={0.5} className={styles.subtitle}>
            {currentImage.subtitle}
          </AnimatedText>
          <div className={styles.location_container}>
            <p className={styles.location_text}>{currentImage.location}</p>
          </div>
          <button
            className={styles.exploreButton_text}
            onClick={(e) => handleExploreClick(e, currentImage.link)}
          >
            {currentImage.buttonText}
          </button>
        </div>
      </div>
      
      <div className={styles.bottom_blue_bar}>
        <div className={styles.pagination_dots}>
          {images.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${index === currentImageIndex ? styles.active : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            ></span>
          ))}
        </div>
      </div>

    </section>
  );
}
