"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./ui-card.module.css";

interface UiCardProps {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  imageAlt?: string;
  location?: string;
}

export function UiCard({
  title,
  description,
  price,
  imageUrl,
  imageAlt = "",
  location = "Ubicación",
}: UiCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={`${styles.card} ${isExpanded ? styles.expanded : ""}`}>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          className={styles.image}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      <div className={styles.content}>
        <div>
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.price}>{price}</p>
          </div>
          {location && (
            <div className={styles.location}>
              <span>📍 {location}</span>
            </div>
          )}
          <p className={styles.description}>{description}</p>
        </div>
        <button className={styles.viewButton}>
          {isExpanded ? "Ver menos" : "Ver más"}
        </button>
      </div>
    </div>
  );
}
