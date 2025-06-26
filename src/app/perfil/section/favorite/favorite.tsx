"use client";

import React from "react";
import Image from "next/image";
import { FaHeart, FaArrowRight } from "react-icons/fa";
import styles from "./favorite.module.css";

interface FavoriteItem {
  id: string;
  title: string;
  location: string;
  image: string;
  isFavorite: boolean;
}

interface FavoriteSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  favorites?: FavoriteItem[];
  currentPage?: number;
  totalPages?: number;
  onToggleFavorite?: (id: string) => void;
  onPageChange?: (page: number) => void;
  onExploreMore?: () => void;
}

export function Favorite({
  title = "Mis Favoritos",
  subtitle = "Tus lugares y experiencias favoritas en San Luis de Gaceno",
  description = "Aquí encontrarás todos los destinos, actividades y servicios que has guardado como favoritos. Puedes eliminarlos o añadirlos cuando quieras.",
  favorites = [
    {
      id: "1",
      title: "PUENTE LA ARBELIA",
      location: "San Luis de Gaceno",
      image: "/images/puente-la-arbelia.jpg",
      isFavorite: true,
    },
    {
      id: "2",
      title: "MIRADOR DE LA MESA",
      location: "San Luis de Gaceno",
      image: "/images/mirador-de-la-mesa.jpg",
      isFavorite: true,
    },
    // Add more default items as needed
  ],
  currentPage = 1,
  totalPages = 2,
  onToggleFavorite = () => {},
  onPageChange = () => {},
  onExploreMore = () => {},
}: FavoriteSectionProps) {
  return (
    <section className={styles.favoriteSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          <h3 className={styles.subtitle}>{subtitle}</h3>
        </div>

        <div className={styles.favoriteGrid}>
          {favorites.map((item) => (
            <div key={item.id} className={styles.favoriteCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <button
                  className={`${styles.favoriteButton} ${
                    item.isFavorite ? styles.favorited : ""
                  }`}
                  onClick={() => onToggleFavorite(item.id)}
                  aria-label={
                    item.isFavorite
                      ? "Eliminar de favoritos"
                      : "Añadir a favoritos"
                  }
                >
                  <FaHeart className={styles.heartIcon} />
                </button>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardLocation}>{item.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <button className={styles.exploreButton} onClick={onExploreMore}>
            SEGUIR EXPLORANDO <FaArrowRight className={styles.arrowIcon} />
          </button>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <span className={styles.pageIndicator}>
                {currentPage} / {totalPages}
              </span>
              <div className={styles.paginationArrows}>
                <button
                  className={`${styles.arrowButton} ${
                    currentPage === 1 ? styles.disabled : ""
                  }`}
                  onClick={() =>
                    currentPage > 1 && onPageChange(currentPage - 1)
                  }
                  disabled={currentPage === 1}
                  aria-label="Página anterior"
                >
                  &lt;
                </button>
                <button
                  className={`${styles.arrowButton} ${
                    currentPage === totalPages ? styles.disabled : ""
                  }`}
                  onClick={() =>
                    currentPage < totalPages && onPageChange(currentPage + 1)
                  }
                  disabled={currentPage === totalPages}
                  aria-label="Siguiente página"
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
