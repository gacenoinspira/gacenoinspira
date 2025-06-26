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
    arrows: true,
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
              {itemsCards.map((item, index) => {
                const initials = item.name
                  ? item.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "US";
                const colors = [
                  "#FF6B6B",
                  "#4ECDC4",
                  "#45B7D1",
                  "#96CEB4",
                  "#FFEEAD",
                ];
                const color = colors[1];

                return (
                  <div className={styles.card} key={index}>
                    <div className={styles.cardHeader}>
                      <div
                        className={styles.avatar}
                        style={{ backgroundColor: color }}
                      >
                        {initials}
                      </div>
                      <div className={styles.userInfo}>
                        <h4 className={styles.userName}>
                          {item.name || "Usuario"}
                        </h4>
                        <span className={styles.commentDate}>Hoy</span>
                      </div>
                    </div>
                    <div className={styles.cardBody}>
                      <p className={styles.commentText}>
                        {item.comment || "Sin comentario"}
                      </p>
                    </div>
                    <div className={styles.cardFooter}>
                      <button className={styles.actionButton}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"></path>
                          <polyline points="16 6 12 2 8 6"></polyline>
                          <line x1="12" y1="2" x2="12" y2="15"></line>
                        </svg>
                      </button>
                      <button className={styles.actionButton}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
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
