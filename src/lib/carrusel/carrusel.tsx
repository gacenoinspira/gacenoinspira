"use client";

import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./carrusel.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface CardProps {
  id: string;
  image: string;
  title: string;
  description: string;
}

interface CarruselProps {
  cards: CardProps[];
}

export function Carrusel({ cards }: CarruselProps) {
  const sliderRef = useRef<Slider>(null);
  const router = useRouter();

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
    centerPadding: "0",
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
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
          {cards.map((card) => (
            <div
              key={card.id}
              className={styles.card}
              onClick={() => router.push(`/poblado/${card.id}`)}
            >
              <img
                src={card.image}
                alt={card.title}
                className={styles.imageCard}
              />
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
