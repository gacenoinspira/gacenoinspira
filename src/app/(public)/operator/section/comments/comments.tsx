"use client";

import { DetailsOperatorTable } from "@/lib/type";
import React, { useRef } from "react";
import styles from "./comments.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CommentsIcon } from "@/lib/icons";

interface Props {
  comments: DetailsOperatorTable[];
}

export function Comments({ comments }: Props) {
  const sliderRef = useRef<Slider>(null);

  const itemsCards = comments.map((comment) => ({
    name: comment.userInfo?.name,
    comment: comment.notes,
  }));

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
    <>
      {itemsCards.length ? (
        <div className={styles.container__comments}>
          <h1>Comments</h1>
          <button
            className={`${styles.navButton} ${styles.prev}`}
            onClick={goToPrev}
            aria-label="Anterior"
          >
            <FaChevronLeft />
          </button>
          <div className={styles.carouselContainer}>
            <Slider ref={sliderRef} {...settings} className={styles.slider}>
              {itemsCards.map((item, index) => (
                <div className={styles.card} key={index}>
                  <p>{item.name}</p>
                  <p>{item.comment}</p>
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
      ) : (
        <div className={styles.noComments}>
          <CommentsIcon width={100} height={100} />
          <p>No hay comentarios</p>
        </div>
      )}
    </>
  );
}
