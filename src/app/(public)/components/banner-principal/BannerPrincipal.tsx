'use client';

/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import styles from './BannerPrincipal.module.css';
import { AnimatedText } from '@/components/AnimatedText';
import { getCarouselItems } from '@/lib/action/carousel-items.action';
import { CarouselTableRow } from '@/lib/repository/carousel-items';
import { useRouter } from 'next/navigation';

// Definición de la data por defecto para casos de error o sin datos
const DEFAULT_CAROUSEL_ITEMS: CarouselTableRow[] = [
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
  const router = useRouter();
  const [items, setItems] = useState<CarouselTableRow[]>([]);
  const [currentCarouselItemIndex, setCurrentCarouselItemIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect para cargar los ítems del carrusel desde Supabase
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getCarouselItems();
        if (response.status && response.data && response.data.length > 0) {
          setItems(response.data);
        } else {
          console.warn("No se encontraron ítems en la base de datos. Usando data por defecto.");
          setItems(DEFAULT_CAROUSEL_ITEMS);
        }
      } catch (e: any) {
        console.error("Error al cargar los ítems desde la base de datos, usando data por defecto:", e);
        setItems(DEFAULT_CAROUSEL_ITEMS);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Nuevo useEffect para el carrusel automático
  useEffect(() => {
    if (items.length > 0) {
      const interval = setInterval(() => {
        setCurrentCarouselItemIndex((prevIndex) => (prevIndex + 1) % items.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [items]);

  const handleExploreClick = (e: React.MouseEvent<HTMLButtonElement>, link: string | null) => {
    e.preventDefault(); // Agregado para evitar el comportamiento predeterminado si es necesario
    if (link) {
      if (link.startsWith('#')) {
        // Lógica para anclas (scrolling a una sección)
        const targetElement = document.querySelector(link);
        if (targetElement) {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      } else {
        router.push(link);
      }
    }
  };

  if (isLoading) {
    return (
      <section className={styles.loading_section}>
        <div className={styles.loading_spinner}></div>
        <p className={styles.loading_text}>Cargando...</p>
      </section>
    );
  }

  const currentItem = items[currentCarouselItemIndex];
  const isVideo = currentItem.src.match(/\.(mp4|mov|webm)$/i);

  return (
    <section className={styles.banner_section}>
      {/* Corrección: Se envuelve el renderizado condicional en un div
        y la 'key' se asigna a este contenedor.
      */}
      <div key={currentItem.id}>
        {isVideo ? (
          <video
            className={styles.media_background}
            src={currentItem.src}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            className={styles.media_background}
            src={currentItem.src}
            alt={currentItem.alt}
          />
        )}
      </div>

      <div className={styles.overlay}></div>
      <div className={styles.color_strip}></div> 
      
      <div className={styles.content_wrapper}>
        <div className={styles.text_content}>
          <AnimatedText className={`${styles.title} ${styles.mainTitle}`}>
            {currentItem.title}
          </AnimatedText>
          <AnimatedText delay={0.5} className={styles.subtitle}>
            {currentItem.subtitle}
          </AnimatedText>
          { currentItem.location &&
            <div className={styles.location_container}>
              <p className={styles.location_text}>{currentItem.location}</p>
            </div>
          }
          <button
            className={styles.exploreButton_text}
            onClick={(e) => handleExploreClick(e, currentItem.link)}
          >
            {currentItem.buttonText}
          </button>
        </div>
      </div>
      
      <div className={styles.bottom_blue_bar}>
        <div className={styles.pagination_dots}>
          {items.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${index === currentCarouselItemIndex ? styles.active : ''}`}
              onClick={() => setCurrentCarouselItemIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}