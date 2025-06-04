'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './carrusel.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface CardProps {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface CarruselProps {
  cards: CardProps[];
}

export function Carrusel({ cards }: CarruselProps) {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    autoplay: false,
    centerMode: false,
    centerPadding: '0',
    cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          centerMode: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false
        }
      }
    ]
  };

  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className={styles.container}>
      <button 
        className={`${styles.navButton} ${styles.prev}`} 
        onClick={goToPrev}
        aria-label="Anterior"
      >
        <FaChevronLeft />
      </button>
      
      <div className={styles.carouselContainer}>
        <Slider {...settings} ref={sliderRef} className={styles.slider}>
          {cards.map((card, index) => (
            <div 
              key={card.id} 
              className={styles.card}
              style={{ '--index': index } as React.CSSProperties}
            >
              <div className={styles.cardImageContainer}>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className={styles.cardImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://via.placeholder.com/300x200?text=Imagen+no+disponible';
                  }}
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      
      <button 
        className={`${styles.navButton} ${styles.next}`} 
        onClick={goToNext}
        aria-label="Siguiente"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
